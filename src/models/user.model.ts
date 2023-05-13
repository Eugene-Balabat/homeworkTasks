import { Column, Entity } from 'typeorm'

@Entity()
export class User {
    @Column({ primary: true, generated: true, name: 'id' })
    id!: number

    @Column({ primary: false, type: 'varchar', length: 50, name: 'login' })
    login!: string

    @Column({ primary: false, type: 'varchar', length: 50, name: 'password', select: false })
    password!: string
}

// TODO: сделать репозиторий для таблицы фотографий пользователей
// сделать апишку для загрузки фото на сервер, при этом в репозиторий фото для пользователя (таблица фото должна исеть колонку user_id) добавлять запись о загруженной фотографии.
// сделать апишку которая будет пвозвращать список всех загруженных фотографий на сервер авторизованным пользователем.
