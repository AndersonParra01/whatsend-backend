import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
} from "typeorm";
import { Delivery } from "./delivery.entity";

@Entity("messages")
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    message: string;

    @Column("int")
    intervale: number;

    @CreateDateColumn({ type: "timestamp", nullable: true })
    created_at: Date;


    @Column({ type: "timestamp", nullable: true })
    updated_at: Date;

    // Relación 1:N con Delivery
    // Un mensaje puede tener muchas entregas
    @OneToMany(() => Delivery, (delivery) => delivery.message)
    deliveries: Delivery[];

}
