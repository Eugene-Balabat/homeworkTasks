import { DataSource } from 'typeorm'
import { User } from '../../models/user.model'
import dataSource from '../../orm.config'
import { Image } from '../../models/image.model'

export class DatabaseService {
    private client: DataSource

    constructor(source: DataSource = dataSource) {
        this.client = source
    }

    async initializeConnection() {
        await this.client.initialize()
        return this
    }

    async insertNewUser(login: string, password: string): Promise<void> {
        await this.client.query(`insert into users (login, password) values (${login}, ${password})`)
    }

    async getUser(login: string, password: string): Promise<User | null> {
        // TODO: посмотреть варианты запросов и фильтраций для typeorm и обязательно для (связанных таблиц),
        //Почитай про абсолютные и относительные импорты.
        return await this.client.getRepository(User).findOne({ where: { login, password }, select: ['id', 'login'] })
    }

    async insertNewUserImage(imageName: string, userId: number): Promise<void> {
        const user = await this.client.getRepository(User).findOne({ where: { id: userId }, select: ['id'] })
        const image = new Image()

        if (user) {
            const imageRepo = await this.client.getRepository(Image)

            image.title = imageName
            image.idUser = user.id

            // await image.save()
            await imageRepo.insert(image)
        } else {
            throw new Error('Bad Request')
        }
    }

    async getAllUserImages(userId: number): Promise<Array<Image>> {
        const user = await this.client.getRepository(User).findOne({ where: { id: userId }, select: ['id'] })

        if (user) {
            const images = await this.client.getRepository(Image).find({ where: { idUser: userId }, select: ['title'] })

            return images
        } else {
            throw new Error('Bad Request')
        }
    }
}
