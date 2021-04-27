import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMoreFieldsToProduct1617803314325 implements MigrationInterface {
  name = "AddMoreFieldsToProduct1617803314325";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ADD "name" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "comparePrice" numeric(18,2) DEFAULT null`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "costPerItem" numeric(18,2) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "quantity" integer DEFAULT null`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "barcode" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "sku" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "isPhysicalProduct" boolean NOT NULL DEFAULT false`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "allowOutOfStockPurchase" boolean NOT NULL DEFAULT false`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "checkPhysicalProductMustHaveAtLeastOneUnit" CHECK (("isPhysicalProduct" IS FALSE) OR ("isPhysicalProduct" IS TRUE AND quantity IS NOT NULL AND quantity > 0))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "checkPhysicalProductMustHaveAtLeastOneUnit"`
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "allowOutOfStockPurchase"`
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "isPhysicalProduct"`
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "sku"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "barcode"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "quantity"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "costPerItem"`);
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "comparePrice"`
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "name"`);
  }
}
