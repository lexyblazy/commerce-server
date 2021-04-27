import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameBusinessNameToStoreName1616894064241
  implements MigrationInterface {
  name = "RenameBusinessNameToStoreName1616894064241";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "merchants" DROP COLUMN "businessName"`
    );
    await queryRunner.query(
      `ALTER TABLE "merchants" DROP CONSTRAINT "UQ_a30e10c142c301a3c35f55f6aa7"`
    );
    await queryRunner.query(
      `ALTER TABLE "merchants" DROP COLUMN "businessNameSlug"`
    );
    await queryRunner.query(
      `ALTER TABLE "merchants" ADD "storeName" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "merchants" ADD "storeNameSlug" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "merchants" ADD CONSTRAINT "UQ_0e28783deeac7324d99f3cd7bd7" UNIQUE ("storeNameSlug")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "merchants" DROP CONSTRAINT "UQ_0e28783deeac7324d99f3cd7bd7"`
    );
    await queryRunner.query(
      `ALTER TABLE "merchants" DROP COLUMN "storeNameSlug"`
    );
    await queryRunner.query(`ALTER TABLE "merchants" DROP COLUMN "storeName"`);
    await queryRunner.query(
      `ALTER TABLE "merchants" ADD "businessNameSlug" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "merchants" ADD CONSTRAINT "UQ_a30e10c142c301a3c35f55f6aa7" UNIQUE ("businessNameSlug")`
    );
    await queryRunner.query(
      `ALTER TABLE "merchants" ADD "businessName" character varying`
    );
  }
}
