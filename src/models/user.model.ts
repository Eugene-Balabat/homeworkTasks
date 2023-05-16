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

// TODO: сделать репозиторий для таблицы фотографий пользователей
// сделать апишку для загрузки фото на сервер, при этом в репозиторий фото для пользователя (таблица фото должна исеть колонку user_id) добавлять запись о загруженной фотографии.
// сделать апишку которая будет пвозвращать список всех загруженных фотографий на сервер авторизованным пользователем.

// 16.05.2022:
// написать запрос в чистом SQL используя DBVieawer который вытаскивает таблицу включающую в себя users и связанные images через inner join.
// разница между inner/left/outer/cross
