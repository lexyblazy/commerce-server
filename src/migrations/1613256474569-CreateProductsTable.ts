import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductsTable1613256474569 implements MigrationInterface {
  name = "CreateProductsTable1613256474569";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying NOT NULL, "price" numeric(18,2) NOT NULL, "merchantId" uuid NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_7139c20741319eaa68e7fac20ed" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_7139c20741319eaa68e7fac20ed"`
    );
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
