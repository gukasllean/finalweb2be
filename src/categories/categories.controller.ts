import {
    Controller, Get, Post, Body, Param, Delete, Put,
    UseGuards,
  } from '@nestjs/common';
  import { CategoryService } from './categories.service';
  import { CreateCategoryDto } from './dto/create-categories.dto';
  import { UpdateCategoryDto } from './dto/update-categories.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
  
  @ApiTags('categories') // hanya untuk tampil rapih di Swagger UI
  @ApiBearerAuth() // 🛡️ menandakan endpoint ini pakai token JWT
  @UseGuards(AuthGuard('jwt')) // 🔐 Wajib supaya NestJS cek token
  @Controller('categories')
  export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
  
    @Post()
    create(@Body() createDto: CreateCategoryDto) {
      return this.categoryService.create(createDto);
    }
  
    @Get()
    findAll() {
      return this.categoryService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.categoryService.findOne(+id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateDto: UpdateCategoryDto) {
      return this.categoryService.update(+id, updateDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.categoryService.remove(+id);
    }
  }
  