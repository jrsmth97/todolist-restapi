import {
    Controller,
    Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LogService } from './log.service';

@Controller('log')
@ApiTags('Log')
export class LogController {
    constructor(private readonly logService: LogService) { }

    @Get()
    public async findAll() {
        return await this.logService.findAll();
    }
}
