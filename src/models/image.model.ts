import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.model'

@Entity({ name: 'images' })
export class Image extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id!: number

    @Column({ primary: false, type: 'varchar', length: 50, name: 'title' })
    title!: string

    // @ManyToOne((type) => User, (user) => user.id)
    // user!: User

    @Column({ primary: false, type: 'int8', name: 'user_id' })
    idUser!: number
}

// DONE: сделать репозиторий для таблицы фотографий пользователей
// сделать апишку для загрузки фото на сервер, при этом в репозиторий фото для пользователя (таблица фото должна исеть колонку user_id) добавлять запись о загруженной фотографии.
// сделать апишку которая будет пвозвращать список всех загруженных фотографий на сервер авторизованным пользователем.
