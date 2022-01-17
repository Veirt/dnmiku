import { MigrationInterface, QueryRunner } from "typeorm";

export class AccountRefactoring1642407702536 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE DNMembership.[dbo].[Accounts] ADD "Cash" int`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE DNMembership.[dbo].[Accounts] DROP COLUMN "Cash"`
        );
    }
}
