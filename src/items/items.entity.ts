import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from '../categories/categories.entity';

@Entity('shopping_items')
export class ShoppingItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itemName: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Category, category => category.items, { onDelete: 'CASCADE' })
  category: Category;
}
