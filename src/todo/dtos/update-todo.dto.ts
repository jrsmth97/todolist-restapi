import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoItemDto {
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
