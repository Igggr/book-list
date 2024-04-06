import { BookEntity } from 'src/book/book.entity';
import { User } from 'src/shared/types/user';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class UserEntity implements User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @OneToMany(() => BookEntity, (book) => book.owner)
    books: BookEntity;
}