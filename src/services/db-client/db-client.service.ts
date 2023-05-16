import { DataSource } from 'typeorm'
import { Image } from '../../models/image.model'
import { User } from '../../models/user.model'
import dataSource from '../../orm.config'

export class DatabaseService {
    private client: DataSource

    constructor(source: DataSource = dataSource) {
        this.client = source
    }

    async initializeConnection() {
        await this.client.initialize()

        const usersWithhotos = await this.client.getRepository(User).find({ relations: ['images'] })

        console.log(usersWithhotos)

        return this
    }

    async insertNewUser(login: string, password: string): Promise<void> {
        await this.client.getRepository(User).save(this.client.getRepository(User).create({ login, password }))
    }

    async getUser(login: string, password: string): Promise<User | null> {
        // TODO: посмотреть варианты запросов и фильтраций для typeorm и обязательно для (связанных таблиц),
        //Почитай про абсолютные и относительные импорты.
        return await this.client.getRepository(User).findOne({ where: { login, password }, select: ['id', 'login'] })
    }

    async insertNewUserImage(imageName: string, userId: number): Promise<void> {
        const user = await this.client.getRepository(User).findOne({ where: { id: userId }, select: ['id'] })
        const image = this.client.getRepository(Image).create({ title: '1', userId: 2 })

        if (user) {
            const imageRepo = await this.client.getRepository(Image)

            image.title = imageName
            image.userId = user.id

            // await image.save()
            await imageRepo.save(image)
        } else {
            throw new Error('Bad Request')
        }
    }

    async getAllUserImages(userId: number): Promise<Array<Image>> {
        const user = await this.client.getRepository(User).findOne({ where: { id: userId }, select: ['id'] })

        // переписать под await this.client.getRepository(User).createQueryBuilder() с фильтром только тех юзеров у которых есть фото

        if (user) {
            const images = await this.client.getRepository(Image).find({ where: { userId: userId }, select: ['title'] })

            return images
        } else {
            throw new Error('Bad Request')
        }
    }
}
