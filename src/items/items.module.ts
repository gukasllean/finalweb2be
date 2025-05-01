import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingItem } from './items.entity';
import { Category } from '../categories/categories.entity';
import { ShoppingItemService } from './items.service';
import { ShoppingItemController } from './items.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingItem, Category])],
  controllers: [ShoppingItemController],
  providers: [ShoppingItemService],
})
export class ShoppingItemModule {}
