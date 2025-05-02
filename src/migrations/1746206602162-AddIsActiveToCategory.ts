import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsActiveToCategory1746206602162 implements MigrationInterface {
    name = 'AddIsActiveToCategory1746206602162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bio"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "shopping_items" DROP CONSTRAINT "FK_b602a05b92f82e13d3ec136e849"`);
        await queryRunner.query(`ALTER TABLE "shopping_items" ALTER COLUMN "itemName" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "shopping_items" ALTER COLUMN "categoryId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "username" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password_hash" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profile_picture" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "shopping_items" ADD CONSTRAINT "FK_b602a05b92f82e13d3ec136e849" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping_items" DROP CONSTRAINT "FK_b602a05b92f82e13d3ec136e849"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profile_picture" SET DEFAULT 'default.jpg'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password_hash" SET DEFAULT 'default_password'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" SET DEFAULT 'default@email.com'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "username" SET DEFAULT 'default_username'`);
        await queryRunner.query(`ALTER TABLE "shopping_items" ALTER COLUMN "categoryId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shopping_items" ALTER COLUMN "itemName" SET DEFAULT 'Unnamed Item'`);
        await queryRunner.query(`ALTER TABLE "shopping_items" ADD CONSTRAINT "FK_b602a05b92f82e13d3ec136e849" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "bio" character varying NOT NULL DEFAULT ''`);
    }

}
