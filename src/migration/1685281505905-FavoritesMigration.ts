import { MigrationInterface, QueryRunner } from "typeorm";

export class FavoritesMigration1685281505905 implements MigrationInterface {
    name = 'FavoritesMigration1685281505905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`favorites\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`post_id\` int NOT NULL, PRIMARY KEY (\`id\`, \`user_id\`, \`post_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`favorites\` ADD CONSTRAINT \`FK_35a6b05ee3b624d0de01ee50593\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`favorites\` ADD CONSTRAINT \`FK_0be5be648c69c6b654efde5181d\` FOREIGN KEY (\`post_id\`) REFERENCES \`posts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`favorites\` DROP FOREIGN KEY \`FK_0be5be648c69c6b654efde5181d\``);
        await queryRunner.query(`ALTER TABLE \`favorites\` DROP FOREIGN KEY \`FK_35a6b05ee3b624d0de01ee50593\``);
        await queryRunner.query(`DROP TABLE \`favorites\``);
    }

}
