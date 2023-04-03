import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class productsTable1680184619695 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'serial4',
            isPrimary: true,
            isNullable: false
          },
          {
            name: 'code',
            type: 'varchar',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'previewImgLink',
            type: 'text',
            isNullable: true
          },
          {
            name: 'originalPrice',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'discountPrice',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: false,
            default: 'NOW()'
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: false,
            default: 'NOW()'
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
