import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dtos/create-log.dto';
import { LogEntity } from './entities/log.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(LogEntity)
    private readonly log: Repository<LogEntity>
  ) {}

  async findAll(): Promise<any> {
    return await this.log.find();
  }

  async create(createLogDto: CreateLogDto): Promise<any> {
    return await this.log.save(createLogDto);
  }
}
