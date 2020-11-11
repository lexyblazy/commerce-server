import {MigrationInterface, QueryRunner} from "typeorm";

export class AddEmailVerificationRequestsTable1605056999427 implements MigrationInterface {
    name = 'AddEmailVerificationRequestsTable1605056999427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "email_verification_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "token" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_0b42bb490b5503208b8724c3850" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "email_verification_requests" ADD CONSTRAINT "FK_fa5e1b34cea1b4d4f3c24d7d0ef" FOREIGN KEY ("userId") REFERENCES "merchants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "merchants" ADD "emailVerified" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "merchants" DROP COLUMN "emailVerified"`);
        await queryRunner.query(`ALTER TABLE "email_verification_requests" DROP CONSTRAINT "FK_fa5e1b34cea1b4d4f3c24d7d0ef"`);
        await queryRunner.query(`DROP TABLE "email_verification_requests"`);
    }

}
