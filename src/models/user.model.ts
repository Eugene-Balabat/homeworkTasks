import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })
export class User extends BaseEntity {
    //@PrimaryGeneratedColumn({ name: 'id' })
    @Column({ primary: true, generated: true, type: 'int8', name: 'id' })
    id!: number

    @Column({ primary: false, type: 'varchar', length: 50, name: 'login' })
    login!: string

    @Column({ primary: false, type: 'varchar', length: 50, name: 'password', select: false })
    password!: string
}

// TODO: сделать репозиторий для таблицы фотографий пользователей
// сделать апишку для загрузки фото на сервер, при этом в репозиторий фото для пользователя (таблица фото должна исеть колонку user_id) добавлять запись о загруженной фотографии.
// сделать апишку которая будет пвозвращать список всех загруженных фотографий на сервер авторизованным пользователем.
