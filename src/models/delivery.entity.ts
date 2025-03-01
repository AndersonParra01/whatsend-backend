import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from "typeorm";
import { Message } from "./message.entity";
import { Customer } from "./customer.entity";

@Entity("deliveries")
@Unique(["message", "client"]) // Asegura que la combinación sea única
export class Delivery {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Message, message => message.deliveries)
    /*     @JoinColumn({ name: "message_id" }) */
    message: Message;

    @ManyToOne(() => Customer, client => client.deliveries)
    /*     @JoinColumn({ name: "client_id" }) */
    client: Customer;

    @Column({ type: "timestamp" })
    sent_at: Date;
}
