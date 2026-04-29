import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, OneToMany
} from 'typeorm';
import { InventoryBatch } from './inventory_batch.entity';
import { Order } from './order.entity';
import { ExpiryStock } from './expiry_stock.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => InventoryBatch, (batch) => batch.product)
  inventoryBatches: InventoryBatch[];

  @OneToMany(() => Order, (order) => order.product)
  orders: Order[];

  @OneToMany(() => ExpiryStock, (expiryStock) => expiryStock.product)
  expiryStocks: ExpiryStock[];
}
