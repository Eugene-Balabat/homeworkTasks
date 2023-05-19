import { Column, MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm'

export class AddDateColumnInImageTable1684511588384 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('images', new TableColumn({ name: 'date', isPrimary: false, type: 'varchar', length: '100' }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('images', 'date')
    }
}
