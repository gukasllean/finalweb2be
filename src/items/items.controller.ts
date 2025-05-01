import {
  Controller, Get, Post, Body, Param, Delete, Put, UseGuards,
} from '@nestjs/common';
import { ShoppingItemService } from './items.service';
import { CreateItemDto } from './dto/create-items.dto';
import { UpdateItemDto } from './dto/update-items.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('items') // hanya untuk tampil rapih di Swagger UI
@ApiBearerAuth() // 🛡️ menandakan endpoint ini pakai token JWT
@UseGuards(AuthGuard('jwt')) // 🔐 Wajib supaya NestJS cek token
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
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateItemDto) {
    return this.itemService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}
