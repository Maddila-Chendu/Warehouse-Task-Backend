import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Product } from './product.entity';
import { InventoryBatch } from './inventory_batch.entity';

@Entity("ExpiryStock")
export class ExpiryStock {

    @PrimaryGeneratedColumn()
    id: string;
    
    @Column()
    productId: string;

    @ManyToOne(() => Product, (product) => product.expiryStocks)
    @JoinColumn({ name: 'productId' })
    product: Product;

    @Column()
    batchId: string;

    @ManyToOne(() => InventoryBatch)
    @JoinColumn({ name: 'batchId' })
    batch: InventoryBatch;

    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'date' })
    expiryDate: Date;

}