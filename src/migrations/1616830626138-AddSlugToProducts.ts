import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSlugToProducts1616830626138 implements MigrationInterface {
  name = "AddSlugToProducts1616830626138";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ADD "slug" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "UQ_464f927ae360106b783ed0b4106" UNIQUE ("slug")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "UQ_464f927ae360106b783ed0b4106"`
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "slug"`);
  }
}
