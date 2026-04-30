import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Users')
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    First_Name: string;

    @Column({ nullable: true })
    Last_Name: string;

    @Column({ nullable: true, unique: true })
    username: string;

    @Column({ nullable: true })
    Password: string;
}  