import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "CharacterStatus", database: "DNWorld" })
export class CharacterStatus {
    @PrimaryGeneratedColumn({ type: "bigint" })
    CharacterID: number;

    @Column({ type: "tinyint" })
    CharacterLevel: number;

    @Column({ type: "tinyint" })
    JobCode: number;

    @Column({ type: "int" })
    LastVillageMapID: number;

    @Column({ type: "bigint" })
    Coin: number;

    @Column({ type: "bigint" })
    WarehouseCoin: number;

    @Column({ type: "smallint" })
    SkillPoint: number;

    @Column({ type: "smallint" })
    Fatigue: number;

    @Column({ type: "smallint" })
    WeeklyFatigue: number;

    @Column({ type: "datetime2" })
    LastLoginDate: Date;

    @Column({ type: "int" })
    LikeCount: number;

    @Column({ type: "int" })
    MissionScore: number;
}
