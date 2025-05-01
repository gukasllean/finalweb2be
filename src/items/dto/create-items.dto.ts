import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  itemName: string;

  @IsInt()
  @ApiProperty()
  quantity: number;

  @IsInt()
  @ApiProperty()
  categoryId: number;
}
