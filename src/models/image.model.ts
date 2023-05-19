import { BaseEntity, BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm'
import { User } from './user.model'

@Entity({ name: 'images' })
export class Image extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int8' })
    id!: number

    @Column({ primary: false, type: 'varchar', length: 100, name: 'title' })
    title!: string

    @Column({ primary: false, type: 'varchar', length: 100, name: 'date' })
    date!: string

    @Column({ primary: false, type: 'int8', name: 'user_id' })
    userId!: number

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user!: User

    @BeforeInsert()
    AddDate() {
        this.date = JSON.stringify(new Date())
    }
}
