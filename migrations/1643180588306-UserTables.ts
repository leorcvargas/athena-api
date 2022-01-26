import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTables1643180588306 implements MigrationInterface {
  name = 'UserTables1643180588306';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_link_kinds" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, CONSTRAINT "PK_6f8a8adbfde7cd3a97baca849db" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "username" character varying(20) NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_links" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "kind_id" uuid NOT NULL, CONSTRAINT "PK_9eb83d225b238275d61eeedd8b1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_links" ADD CONSTRAINT "FK_eeab762cfb0466ef8228be673f9" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_links" ADD CONSTRAINT "FK_88eeea040f9ed73aa2ef41a41ba" FOREIGN KEY ("kind_id") REFERENCES "user_link_kinds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_links" DROP CONSTRAINT "FK_88eeea040f9ed73aa2ef41a41ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_links" DROP CONSTRAINT "FK_eeab762cfb0466ef8228be673f9"`,
    );
    await queryRunner.query(`DROP TABLE "user_links"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "user_link_kinds"`);
  }
}
