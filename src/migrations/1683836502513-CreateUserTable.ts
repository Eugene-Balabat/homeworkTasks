import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUserTable1683836502513 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('create table if not exists users (id SERIAL PRIMARY KEY, login varchar(50), password varchar(50))')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('drop table if exists users')
    }
}
