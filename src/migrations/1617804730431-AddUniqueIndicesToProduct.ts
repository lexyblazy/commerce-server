import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueIndicesToProduct1617804730431
  implements MigrationInterface {
  name = "AddUniqueIndicesToProduct1617804730431";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "products"."comparePrice" IS NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "comparePrice" SET DEFAULT null`
    );
    await queryRunner.query(`COMMENT ON COLUMN "products"."quantity" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "quantity" SET DEFAULT null`
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "products"."comparePrice" IS NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "comparePrice" SET DEFAULT null`
    );
    await queryRunner.query(`COMMENT ON COLUMN "products"."quantity" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "quantity" SET DEFAULT null`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "indexUqMerchantIdAndSKU" ON "products" ("merchantId", "sku") `
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "indexUqMerchantIdAndBarcode" ON "products" ("merchantId", "barcode") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "indexUqMerchantIdAndBarcode"`);
    await queryRunner.query(`DROP INDEX "indexUqMerchantIdAndSKU"`);

    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "quantity" DROP DEFAULT`
    );
    await queryRunner.query(`COMMENT ON COLUMN "products"."quantity" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "comparePrice" SET DEFAULT NULL`
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "products"."comparePrice" IS NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "quantity" DROP DEFAULT`
    );
    await queryRunner.query(`COMMENT ON COLUMN "products"."quantity" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "comparePrice" SET DEFAULT NULL`
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "products"."comparePrice" IS NULL`
    );
  }
}
