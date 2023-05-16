import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.model'

@Entity({ name: 'images' })
export class Image extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int8' })
    id!: number

    @Column({ primary: false, type: 'varchar', length: 100, name: 'title' })
    title!: string

    @Column({ primary: false, type: 'int8', name: 'user_id' })
    userId!: number

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user!: User
}

// DONE: сделать репозиторий для таблицы фотографий пользователей
// сделать апишку для загрузки фото на сервер, при этом в репозиторий фото для пользователя (таблица фото должна исеть колонку user_id) добавлять запись о загруженной фотографии.
// сделать апишку которая будет пвозвращать список всех загруженных фотографий на сервер авторизованным пользователем.
