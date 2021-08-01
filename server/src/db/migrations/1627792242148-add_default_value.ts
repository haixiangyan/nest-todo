import {MigrationInterface, QueryRunner} from "typeorm";

export class addDefaultValue1627792242148 implements MigrationInterface {
    name = 'addDefaultValue1627792242148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`nest_todo\`.\`user\` CHANGE \`is_admin\` \`is_admin\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`nest_todo\`.\`todo\` CHANGE \`status\` \`status\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`nest_todo\`.\`todo\` CHANGE \`status\` \`status\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`nest_todo\`.\`user\` CHANGE \`is_admin\` \`is_admin\` int NOT NULL`);
    }

}
