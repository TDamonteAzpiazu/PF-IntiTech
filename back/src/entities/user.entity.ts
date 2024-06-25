import { Role } from "src/enum/role.enum";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid";
@Entity({name : "users"})
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string = uuid;

    @Column({length : 50 })
    name: string = uuid();

    @Column({length : 50 , unique : true})
    email: string;

    @Column({length : 50 })
    password: string;

    @Column({length : 50 })
    adress : string;

    @Column({length : 50 })
    phone : string;

    @Column({length : 50 })
    country : string;

    @Column({default: Role.User})
    role: Role
}