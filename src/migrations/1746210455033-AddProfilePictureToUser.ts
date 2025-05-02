// Create a new migration file
import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeProfilePictureNullable1712171227688 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profile_picture" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profile_picture" SET NOT NULL`);
    }
}