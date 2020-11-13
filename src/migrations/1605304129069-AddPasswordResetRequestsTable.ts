import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordResetRequestsTable1605304129069
  implements MigrationInterface {
  name = "AddPasswordResetRequestsTable1605304129069";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "password_reset_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "expiresAt" TIMESTAMP NOT NULL, "token" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_4aa83fc224280f3c94c3e214d65" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "password_reset_requests" ADD CONSTRAINT "FK_91edfdb7662932426087df8df4d" FOREIGN KEY ("userId") REFERENCES "merchants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "password_reset_requests" DROP CONSTRAINT "FK_91edfdb7662932426087df8df4d"`
    );
    await queryRunner.query(`DROP TABLE "password_reset_requests"`);
  }
}
