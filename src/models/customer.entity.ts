import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Delivery } from "./delivery.entity";
import { BranchOffice } from "./branche_office.entity";
import { Status } from "./status";

@Entity("customers")
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100, nullable: true })
    names: string;

    @Column({ type: "varchar", length: 20, nullable: false })
    phone: string;

    @Column({ type: "varchar", length: 200, nullable: true })
    email: string;

    @Column({
        type: "enum",
        enum: Status,
        nullable: false
    })
    status: Status;

    @Column({ type: "date", nullable: true })
    createdAt: Date;

    @Column({ type: "date", nullable: true })
    updatedAt: Date;

    @OneToMany(() => Delivery, delivery => delivery.client)
    deliveries: Delivery[];

    @ManyToOne(() => BranchOffice, (branch) => branch.customers, { nullable: true })
    branch: BranchOffice;
}
