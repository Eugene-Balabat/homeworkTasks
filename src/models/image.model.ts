import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from './user.model'

@Entity()
export class Image {
    @PrimaryGeneratedColumn({ name: 'id' })
    id!: number

    @Column({ primary: false, type: 'varchar', length: 50, name: 'title' })
    title!: string

    @ManyToOne((type) => User, (user) => user.id)
    user!: User
}

// TODO: сделать репозиторий для таблицы фотографий пользователей
// сделать апишку для загрузки фото на сервер, при этом в репозиторий фото для пользователя (таблица фото должна исеть колонку user_id) добавлять запись о загруженной фотографии.
// сделать апишку которая будет пвозвращать список всех загруженных фотографий на сервер авторизованным пользователем.