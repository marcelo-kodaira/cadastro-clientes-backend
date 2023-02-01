import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Contacts from "./contacts.entity";

@Entity('clients')
class Clients{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    nome: string


    @Column()
    telefone: string

    @Column()
    email: string

    @Column()
    senha: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Contacts, (contact) => contact.clients, {onDelete: "CASCADE"})
    contacts: Contacts[]
}

export default Clients