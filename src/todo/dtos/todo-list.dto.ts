import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TodoItemListDto {
  @IsOptional()
  @ApiProperty()
  readonly activity_group_id?: number;
}
