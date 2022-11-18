import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    first_name: string;

    @Column({nullable: false, type: "enum", enum: ['male', 'female']})
    gender: 'male' | 'female';

    @ManyToMany(() => User)
    @JoinTable({name: "user-relations"})
    followers: User[]
}
