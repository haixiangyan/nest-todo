import {MigrationInterface, QueryRunner} from "typeorm";

export class init1627741376511 implements MigrationInterface {
    name = 'init1627741376511'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`nest_todo\`.\`todo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(500) NOT NULL, \`description\` text NOT NULL, \`status\` int NOT NULL, \`media\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`nest_todo\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(500) NOT NULL, \`password\` varchar(500) NOT NULL, \`email\` varchar(500) NOT NULL, \`is_admin\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`nest_todo\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`nest_todo\`.\`todo\``);
    }

}
