import * as redis from 'redis'

export class RedisService {
    private redisClient: redis.RedisClientType

    constructor() {
        this.redisClient = redis.createClient()
    }

    async initializeService() {
        this.redisClient.on('error', (err) => console.log('Redis Client Error', err))

        await this.redisClient.connect()
        return this
    }

    async setData<T>(data: T, key: string, time: number) {
        await this.redisClient.set(key, JSON.stringify(data), { EX: time })
    }

    async getData(key: string) {
        const data = await this.redisClient.get(key)
        return data ? data : undefined
    }
}
