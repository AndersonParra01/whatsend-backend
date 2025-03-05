import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { Status } from "./status";

@Entity("branches")
export class BranchOffice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 250 })
    name: string;

    @Column("varchar", { length: 250 })
    address: string;

    @Column({
        type: "enum",
        enum: Status,
    })
    status: Status;

    @CreateDateColumn({ type: "timestamp", nullable: true })
    created_at: Date;

    @Column({ type: "timestamp", nullable: true })
    updated_at: Date;
    // Relación: una sucursal tiene muchos contactos
    @OneToMany(() => Customer, (customer) => customer.branch)
    customers: Customer[];


}

