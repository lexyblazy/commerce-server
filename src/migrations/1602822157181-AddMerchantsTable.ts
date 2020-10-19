import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMerchantsTable1602822157181 implements MigrationInterface {
  name = "AddMerchantsTable1602822157181";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "merchants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "normalizedEmail" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL,CONSTRAINT "UQ_7682193bcf281285d0a459c4b1e" UNIQUE ("normalizedEmail"), CONSTRAINT "PK_4fd312ef25f8e05ad47bfe7ed25" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "merchants"`);
  }
}
