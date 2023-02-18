import { ArgumentsHost, Catch, HttpException, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { LogService } from "../../log/log.service";
import { CreateLogDto } from "../../log/dtos/create-log.dto";

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {

    constructor(private readonly logService: LogService) {
        super();
    }

    catch(exception: any, host: ArgumentsHost): void {

        if(typeof exception?.response?.stack === 'string' && exception?.stack){
            exception.stack = exception.response.stack;
        }

        const ctx = host.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();
        const errStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const resMessage = (type, message, errorCode = 0) => {
            const resData = {
                statusCode: errStatus,
                message: message,
                error: type,
                errorCode: errorCode,
                path: req.url
            }

            const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            const userAgent = req.header('user-agent');

            const createLogDto: CreateLogDto = {
                type: 'ERROR',
                status_code: errStatus,
                message: type,
                ip,
                user_agent: userAgent,
                full_request: JSON.stringify({
                    headers: req.headers,
                    body: req.body
                }),
                full_response: JSON.stringify({
                    headers: '',
                    body: resData
                }),
                stacks: String(exception.stack)
            }

            this.logService.create(createLogDto).catch(err => console.error('Error creating log', err))
            res.status(errStatus).json(resData)
        }

        if (typeof exception.response === 'object') {

            resMessage(exception.name, exception.response.message, exception.code);

        } else {
            resMessage('Error', exception.message, exception.code)
        }
    }

}