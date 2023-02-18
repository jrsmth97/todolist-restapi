import { IsNotEmpty, IsString, IsEmail, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoItemDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly title: string;
  
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly activity_group_id: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  readonly is_active: boolean;
}
