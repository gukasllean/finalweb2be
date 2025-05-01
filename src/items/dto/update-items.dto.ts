import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateItemDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  itemName?: string;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  quantity?: number;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  categoryId?: number;
}
