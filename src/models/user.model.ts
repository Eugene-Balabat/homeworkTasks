import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Image } from './image.model'

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int8' })
    id!: number

    @Column({ primary: false, type: 'varchar', length: 50, name: 'login' })
    login!: string

    @Column({ primary: false, type: 'varchar', length: 50, name: 'password', select: false })
    password!: string

    @OneToMany(() => Image, (image) => image.user)
    images!: Image[]
}
