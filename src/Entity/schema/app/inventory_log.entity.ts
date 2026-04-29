import 'reflect-metadata';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Order } from './order.entity';
import { InventoryBatch } from './inventory_batch.entity';

@Entity('inventory_logs')
export class InventoryLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    orderId: string;

    @ManyToOne(() => Order, (order) => order.inventoryLogs)
    @JoinColumn({ name: 'orderId' })
    order: Order;

    @Column()
    batchId: string;

    @ManyToOne(() => InventoryBatch, (batch) => batch.inventoryLogs)
    @JoinColumn({ name: 'batchId' })
    batch: InventoryBatch;

    @Column({ type: 'int' })
    quantityDeducted: number;

    @CreateDateColumn()
    createdAt: Date;
}