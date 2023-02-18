import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTodoItemDto } from './dtos/update-todo.dto';
import { TodoEntity } from './entities/todo.entity';
import { CreateTodoItemDto } from './dtos/create-todo.dto';
import { TodoItemListDto } from './dtos/todo-list.dto';
import { ActivityEntity } from 'src/activity/entities/activity.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todo: Repository<TodoEntity>,
    @InjectRepository(ActivityEntity)
    private readonly activity: Repository<ActivityEntity>,
  ) {}

  async findAll(todoitemlistdto: TodoItemListDto): Promise<TodoEntity[]> {
    return await this.todo.find(todoitemlistdto ?? {});
  }

  async findOne(id: number): Promise<TodoEntity> {
    return await this.todo.findOne({ id }, { relations: ['activity'] });
  }

  async insert(createTodoItemDto: CreateTodoItemDto): Promise<TodoEntity> {
    const activity = await this.activity.findOne({ id: createTodoItemDto.activity_group_id });
    if (!activity) throw new NotFoundException("Activity group not found");
    return await this.todo.save(createTodoItemDto).catch(err => {
      throw new InternalServerErrorException(err);
    });
  }

  async update(id: number, updateTodoItemDto: UpdateTodoItemDto): Promise<TodoEntity> {
    const todo = await this.todo.findOne(id);
    if (!todo) {
      throw new NotFoundException('todo item not found !');
    }

    todo.title = updateTodoItemDto.title;
    todo.activity_group_id = updateTodoItemDto.activity_group_id;
    todo.is_active = updateTodoItemDto.is_active;
    return await todo.save().catch(err => {
      throw new InternalServerErrorException(err);
    });
  }

  async delete(id: number): Promise<TodoEntity> {
    const todo = await this.todo.findOne(id);
    if (!todo) {
      throw new NotFoundException('todo item not found !');
    }
    
    await this.todo.delete(id);
    return todo;
  }
}
