import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, JoinColumn, OneToMany
} from 'typeorm';
import { Product } from './product.entity';
import { InventoryLog } from './inventory_log.entity';

@Entity('inventory_batches')
export class InventoryBatch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: string;

  @ManyToOne(() => Product, (product) => product.inventoryBatches)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ type: 'int' })
  quantity: number;            

  @Column({ type: 'int' })
  remainingQuantity: number;    

  @Column({ nullable: true })
  bin_name: string;

  @Column({ type: 'date' })
  expiryDate: Date;             

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => InventoryLog, (log) => log.batch)
  inventoryLogs: InventoryLog[];
}