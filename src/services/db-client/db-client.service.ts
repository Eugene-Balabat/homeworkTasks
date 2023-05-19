import { Brackets, DataSource, QueryBuilder, SelectQueryBuilder } from 'typeorm'
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
        const images = await this.getAllUserImages(1, 0, 3)
        console.log(images)

        return this
    }

    async insertNewUser(login: string, password: string): Promise<void> {
        await this.client.getRepository(User).save(this.client.getRepository(User).create({ login, password }))
    }

    async getUser(login: string, password: string): Promise<User | null> {
        // DONE: посмотреть варианты запросов и фильтраций для typeorm и обязательно для (связанных таблиц),
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

    async getAllUserImages(userId: number, page: number, limit: number): Promise<Array<Image>> {
        return this.client
            .getRepository(Image)
            .createQueryBuilder('image')
            .whereExists(this.client.getRepository(User).createQueryBuilder('user').where('user.id = :userId', { userId }).andWhere('image.user = user.id'))
            .skip(page * limit)
            .take(limit)
            .orderBy('image.date', 'DESC')
            .getMany()
    }

    async getUsersWithPhotos() {
        return this.client.getRepository(User).createQueryBuilder('user').innerJoinAndSelect('user.images', 'image').getMany()
    }
}
