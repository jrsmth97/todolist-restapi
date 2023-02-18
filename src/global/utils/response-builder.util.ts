import { ResponseFormat } from "../interfaces/response-format.interface";

export class ResponseBuilder {
    constructor() {}

    public static SuccessResponse(data?: any): ResponseFormat {
        return {
            status: "Success",
            message: "Success",
            data: data,
        }
    }

    public static ErrorResponse(message: string, errStatus: string): ResponseFormat {
        return {
            status: errStatus,
            message: message,
            data: null,
        }
    }

    public static NotFoundResponse(message: string): ResponseFormat {
        return {
            status: "Not Found",
            message: message,
            data: null,
        }
    }
}