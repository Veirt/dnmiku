import { MigrationInterface, QueryRunner } from "typeorm";

export class AccountRefactoring1637229033943 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE [dbo].[Accounts] ADD [Avatar] varchar(40) NULL"
        );
        await queryRunner.query(
            "ALTER TABLE [dbo].[Accounts] ADD [DiscordID] varchar(20) NULL"
        );
        await queryRunner.query(
            "ALTER TABLE [dbo].[Accounts] ADD [Email] varchar(50)"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE [dbo].[Accounts] DROP COLUMN [Avatar]"
        );
        await queryRunner.query(
            "ALTER TABLE [dbo].[Accounts] DROP COLUMN [DiscordID]"
        );
        await queryRunner.query(
            "ALTER TABLE [dbo].[Accounts] DROP COLUMN [Email]"
        );
    }
}
