import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityEntity } from './entities/activity.entity';
import { ActivityController } from './activity.controller';
import { TodoEntity } from '../todo/entities/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActivityEntity])
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [ActivityService]
})
export class ActivityModule {}
