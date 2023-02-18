import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { UpdateTodoItemDto } from './dtos/update-todo.dto';
import { CreateTodoItemDto } from './dtos/create-todo.dto';
import { TodoItemListDto } from './dtos/todo-list.dto';
import { ResponseBuilder } from 'src/global/utils/response-builder.util';
import { ResponseFormat } from 'src/global/interfaces/response-format.interface';

@Controller('todo-items')
@ApiTags('Todo Items')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Post()
  public async create(@Body() createTodoItemDto: CreateTodoItemDto): Promise<ResponseFormat> {
    const createdTodo = await this.todoService.insert(createTodoItemDto);
    return ResponseBuilder.SuccessResponse(createdTodo);
  }
  
  @Get()
  public async findAll(@Query() params: TodoItemListDto): Promise<ResponseFormat> {
    const todos = await this.todoService.findAll(params);
    return ResponseBuilder.SuccessResponse(todos);
  }

  @Get(':id')
  public async findOne(@Param('id') id: number): Promise<ResponseFormat> {
    const todo = await this.todoService.findOne(id);
    if (!todo) return ResponseBuilder.NotFoundResponse(`Todo with ID ${id} Not Found`);
    return ResponseBuilder.SuccessResponse(todo);
  }
  
  @Patch(':id')
  public async update(@Param('id') id: number, @Body() updateTodoItemDto: UpdateTodoItemDto): Promise<ResponseFormat> {
    const todo = await this.todoService.findOne(id);
    if (!todo) return ResponseBuilder.NotFoundResponse(`Todo with ID ${id} Not Found`)
    const updateTodo = this.todoService.update(id, updateTodoItemDto);
    return ResponseBuilder.SuccessResponse(updateTodo);
  }
  
  @Delete(':id')
  public async remove(@Param('id') id: number): Promise<ResponseFormat> {
    const todo = await this.todoService.findOne(id);
    if (!todo) return ResponseBuilder.NotFoundResponse(`Todo with ID ${id} Not Found`)
    const deletedTodo = this.todoService.delete(id);
    return ResponseBuilder.SuccessResponse(deletedTodo);
  }
}
