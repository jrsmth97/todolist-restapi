import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateActivityGroupDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly title: string;
}
