import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { TodoController } from './todo.controller';
import { ActivityEntity } from '../activity/entities/activity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoEntity]),
    TypeOrmModule.forFeature([ActivityEntity]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService]
})
export class AuthorModule {}
