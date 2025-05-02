import {
  Controller, Get, Post, Body, Param, Delete, Put, UseGuards, ParseIntPipe,
} from '@nestjs/common';
import { ShoppingItemService } from './items.service';
import { CreateItemDto } from './dto/create-items.dto';
import { UpdateItemDto } from './dto/update-items.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('items')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('items')
export class ShoppingItemController {
  constructor(private readonly itemService: ShoppingItemService) {}

  @Post()
  create(@Body() createDto: CreateItemDto) {
    return this.itemService.create(createDto);
  }

  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.itemService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateItemDto) {
    return this.itemService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.itemService.remove(id);
  }
}
