import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoriesTable1745507557725 implements MigrationInterface {
    name = 'CreateCategoriesTable1745507557725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "categories" (
                "id" SERIAL NOT NULL, 
                "name" character varying NOT NULL, 
                CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), 
                CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id")
            )`);
        
        await queryRunner.query(`ALTER TABLE "shopping_items" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "shopping_items" DROP COLUMN "is_purchased"`);
        await queryRunner.query(`ALTER TABLE "shopping_items" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "shopping_items" DROP COLUMN "updated_at"`);

        await queryRunner.query(`ALTER TABLE "shopping_items" ADD "itemName" character varying NOT NULL DEFAULT 'Unnamed Item'`);
        await queryRunner.query(`ALTER TABLE "shopping_items" ADD "categoryId" integer`);

        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying NOT NULL DEFAULT 'default_username'`);

        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying NOT NULL DEFAULT 'default@email.com'`);

        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password_hash"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password_hash" character varying NOT NULL DEFAULT 'default_password'`);

        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profile_picture"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "profile_picture" character varying NOT NULL DEFAULT 'default.jpg'`);

        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bio"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "bio" character varying NOT NULL DEFAULT ''`);

        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT now()`);

        await queryRunner.query(`ALTER TABLE "shopping_items" ALTER COLUMN "quantity" DROP DEFAULT`);

        await queryRunner.query(`
            ALTER TABLE "shopping_items" 
            ADD CONSTRAINT "FK_b602a05b92f82e13d3ec136e849" 
            FOREIGN KEY ("categoryId") REFERENCES "categories"("id") 
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping_items" DROP CONSTRAINT "FK_b602a05b92f82e13d3ec136e849"`);
        await queryRunner.query(`ALTER TABLE "shopping_items" ALTER COLUMN "quantity" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bio"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "bio" text`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profile_picture"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "profile_picture" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password_hash"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password_hash" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "shopping_items" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "shopping_items" DROP COLUMN "itemName"`);
        await queryRunner.query(`ALTER TABLE "shopping_items" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "shopping_items" ADD "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "shopping_items" ADD "is_purchased" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "shopping_items" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }
}
