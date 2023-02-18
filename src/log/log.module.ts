import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogEntity } from './entities/log.entity';
import { LogController } from './log.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([LogEntity]),
  ],
  providers: [LogService],
  controllers: [LogController],
  exports: [LogService]
})
export class LogModule {}
