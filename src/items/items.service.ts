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
    const category = await this.categoryRepo.findOne({
      where: { id: createDto.categoryId, isActive: true },
    });
    if (!category) {
      throw new NotFoundException('Active category not found');
    }

    const item = this.itemRepo.create({
      itemName: createDto.itemName,
      quantity: createDto.quantity,
      category,
    });

    return this.itemRepo.save(item);
  }

  async findAll(): Promise<ShoppingItem[]> {
    return this.itemRepo
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.category', 'category')
      .where('category.isActive = :active', { active: true })
      .getMany();
  }

  async findOne(id: number): Promise<ShoppingItem> {
    const item = await this.itemRepo.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  async update(id: number, updateDto: UpdateItemDto): Promise<ShoppingItem> {
    const item = await this.findOne(id);

    if (updateDto.categoryId) {
      const category = await this.categoryRepo.findOne({
        where: { id: updateDto.categoryId, isActive: true },
      });
      if (!category) throw new NotFoundException('Active category not found');
      item.category = category;
    }

    Object.assign(item, updateDto);
    return this.itemRepo.save(item);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.itemRepo.remove(item);
  }

  // Optional: get items by specific category ID (if needed)
  async findByCategoryId(categoryId: number): Promise<ShoppingItem[]> {
    const category = await this.categoryRepo.findOne({
      where: { id: categoryId, isActive: true },
    });

    if (!category) throw new NotFoundException('Active category not found');

    return this.itemRepo.find({
      where: { category: { id: categoryId } },
      relations: ['category'],
    });
  }
}
