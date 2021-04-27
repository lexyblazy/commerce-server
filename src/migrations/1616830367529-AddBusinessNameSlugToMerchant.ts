import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBusinessNameSlugToMerchant1616830367529
  implements MigrationInterface {
  name = "AddBusinessNameSlugToMerchant1616830367529";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "merchants" ADD "businessName" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "merchants" ADD "businessNameSlug" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "merchants" ADD CONSTRAINT "UQ_a30e10c142c301a3c35f55f6aa7" UNIQUE ("businessNameSlug")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "merchants" DROP CONSTRAINT "UQ_a30e10c142c301a3c35f55f6aa7"`
    );
    await queryRunner.query(
      `ALTER TABLE "merchants" DROP COLUMN "businessNameSlug"`
    );
    await queryRunner.query(
      `ALTER TABLE "merchants" DROP COLUMN "businessName"`
    );
  }
}
