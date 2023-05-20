import { BaseEntity, BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.model'

@Entity({ name: 'images' })
export class Image extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int8' })
    id!: number

    @Column({ primary: false, type: 'varchar', length: 100, name: 'title' })
    title!: string

    @Column({ primary: false, type: 'timestamp', name: 'date', default: () => 'NOW()' })
    date!: Date

    @Column({ primary: false, type: 'int8', name: 'user_id' })
    userId!: number

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user!: User

    @BeforeInsert()
    addDate() {
        console.log(`Added image for user ${this.userId}`)
    }
}

console.log(JSON.stringify(new Date()))
