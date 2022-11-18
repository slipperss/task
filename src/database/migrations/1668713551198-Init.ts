import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1668713551198 implements MigrationInterface {
    name = 'Init1668713551198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "gender" "public"."users_gender_enum" NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user-relations" ("usersId_1" integer NOT NULL, "usersId_2" integer NOT NULL, CONSTRAINT "PK_eb3626cd44c016aa95f972e13b0" PRIMARY KEY ("usersId_1", "usersId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_36a2c8c655f7d4ace1657b0f8b" ON "user-relations" ("usersId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_8b280bafc53fe5865104abd189" ON "user-relations" ("usersId_2") `);
        await queryRunner.query(`ALTER TABLE "user-relations" ADD CONSTRAINT "FK_36a2c8c655f7d4ace1657b0f8b3" FOREIGN KEY ("usersId_1") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user-relations" ADD CONSTRAINT "FK_8b280bafc53fe5865104abd189b" FOREIGN KEY ("usersId_2") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-relations" DROP CONSTRAINT "FK_8b280bafc53fe5865104abd189b"`);
        await queryRunner.query(`ALTER TABLE "user-relations" DROP CONSTRAINT "FK_36a2c8c655f7d4ace1657b0f8b3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8b280bafc53fe5865104abd189"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_36a2c8c655f7d4ace1657b0f8b"`);
        await queryRunner.query(`DROP TABLE "user-relations"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
    }

}
