import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'user_name'})
    userName: string;

    @Column()
    value: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;  
}
