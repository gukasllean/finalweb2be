import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingItem } from './items.entity';
import { CreateItemDto } from './dto/create-items.dto';
import { UpdateItemDto } from './dto/update-items.dto';
import { Category } from '../categories/categories.entity';

@Injectable()
export class ShoppingItemService {
  constructor(
    @InjectRepository(ShoppingItem)
    private readonly itemRepo: Repository<ShoppingItem>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(createDto: CreateItemDto): Promise<ShoppingItem> {
    const category = await this.categoryRepo.findOneBy({ id: createDto.categoryId });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const item = this.itemRepo.create({
      itemName: createDto.itemName,
      quantity: createDto.quantity,
      category,
    });

    return this.itemRepo.save(item);
  }

  async findAll(): Promise<ShoppingItem[]> {
    return this.itemRepo.find({ relations: ['category'] });
  }

  async findOne(id: number): Promise<ShoppingItem> {
    const item = await this.itemRepo.findOne({ where: { id }, relations: ['category'] });
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  async update(id: number, updateDto: UpdateItemDto): Promise<ShoppingItem> {
    const item = await this.findOne(id);
    if (updateDto.categoryId) {
      const category = await this.categoryRepo.findOneBy({ id: updateDto.categoryId });
      if (!category) throw new NotFoundException('Category not found');
      item.category = category;
    }

    Object.assign(item, updateDto);
    return this.itemRepo.save(item);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.itemRepo.remove(item);
  }
}
