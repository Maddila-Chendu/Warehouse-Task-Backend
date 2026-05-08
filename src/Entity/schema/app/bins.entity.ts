import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn, 
} from "typeorm";


@Entity('bins')
export class BinEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    bin_name: string;

    @Column({ type: 'int', default: 0 })
    max_quantity: number;

    @Column({ nullable: true })
    location: string;

    @Column({ type: 'boolean', default: true })
    is_available: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    

}