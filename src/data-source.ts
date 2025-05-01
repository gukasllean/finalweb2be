import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './users/user.entity';
import { Category } from './categories/categories.entity';
import { ShoppingItem } from './items/items.entity';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL, // ✅ Use connection string
  entities: [User, Category, ShoppingItem],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  ssl: true, // ✅ Required by Neon
});

export default AppDataSource;