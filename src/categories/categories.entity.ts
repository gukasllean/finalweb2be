import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ShoppingItem } from '../items/items.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => ShoppingItem, item => item.category, { cascade: true })
  items: ShoppingItem[];
}
