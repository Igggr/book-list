import { UserEntity } from "src/user/user.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BookEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    year: number;

    @Column()
    description: string;

    @ManyToOne(() => UserEntity, (owner) => owner.books)
    owner: UserEntity;

    @DeleteDateColumn({ type: 'timestamptz' })
    deletedAt: Date;
}