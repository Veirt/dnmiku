import { pool } from "../db/pool";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  Binary,
  CreateDateColumn,
} from "typeorm";
import sql from "mssql";

@Entity({ name: "Accounts" })
export class Account {
  @PrimaryGeneratedColumn()
  AccountId: number;

  @Column({ type: "nvarchar", length: 50, unique: true })
  AccountName: string;

  @Column({ type: "tinyint" })
  AccountLevelCode: number;

  @Column({ type: "binary", length: 20, nullable: true })
  GameOption: Binary;

  @Column({ type: "tinyint" })
  CharacterCreateLimit: number;

  @Column({ type: "datetime2", nullable: true })
  LastCharacterCreateDate: Date;

  @Column({ type: "tinyint" })
  CharacterMaxCount: number;

  @Column({ type: "datetime2", nullable: true })
  LastLoginDate: Date;

  @Column({ type: "datetime2", nullable: true })
  LastLogoutDate: Date;

  @Column({ type: "int", nullable: true })
  LastLoginIP: number;

  @Column({ type: "int", nullable: true })
  LastSessionID: number;

  @Column({ type: "int", nullable: true })
  JoinIP: number;

  @Column({ type: "datetime2", default: () => "GETDATE()" })
  RegisterDate: Date;

  @Column({ type: "tinyint" })
  PublisherCode: number;

  @Column({ type: "tinyint", nullable: true })
  GenderCode: number;

  @Column({ type: "date", nullable: true })
  BirthDate: Date;

  @Column({ type: "varchar", length: 32, nullable: true })
  Passphrase: string;

  @Column({ type: "binary", length: 80, nullable: true })
  KeySettingOption: Binary;

  @Column({ type: "binary", length: 20, nullable: true })
  SecondAuthPassphrase: Binary;

  @Column({ type: "tinyint" })
  SecondAuthFailCount: number;

  @Column({ type: "tinyint" })
  SecondAuthCode: number;

  @Column({ type: "bit" })
  SecondAuthLockFlag: boolean;

  @Column({ type: "date", nullable: true })
  LastSecondAuthNotifyDate: Date;

  @Column({ type: "binary", length: 201, nullable: true })
  GamePadOption: Binary;

  @Column({ type: "tinyint", nullable: true })
  NationalityCode: number;

  @Column({ type: "smalldatetime", nullable: true })
  SecondAuthResetDate: Date;

  @Column({ type: "tinyint", nullable: true })
  ChannelPartnerCode: number;

  @Column({ type: "int", nullable: true })
  TotalDT: number;

  @Column({ type: "bigint", nullable: true })
  AccountKey: number;

  @Column({ type: "tinyint", nullable: true })
  CharacterSortCode: number;

  @Column({ type: "bit", nullable: true })
  ConnectNoticeFlag: boolean;

  @Column({ type: "bit", nullable: true })
  NewbieRewardFlag: boolean;

  @Column({ type: "datetime2", nullable: true })
  NewbieRewardDate: Date;

  @Column({ type: "bit", nullable: true })
  ReturnRewardFlag: boolean;

  @Column({ type: "bit", nullable: true })
  LockFlag: boolean;

  @Column({ type: "varchar", length: 32 })
  RLKTPassword: string;

  @Column({ type: "int", nullable: true })
  cash: number;

  @Column({ type: "varchar", length: 50, unique: true })
  Email: string;

  @BeforeInsert()
  async encryptPassword() {
    this.RLKTPassword = await encryptPassword(this.RLKTPassword);
  }
}

const encryptPassword = (password: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = await pool
        .request()
        .input("password", sql.VarChar(12), password)
        .query(
          "SELECT UPPER(SUBSTRING(sys.fn_VarBinToHexStr(HASHBYTES('MD5', @password)),3,32)) AS EncryptedPassword"
        );

      resolve(query.recordset[0].EncryptedPassword);
    } catch (err) {
      reject(err);
    }
  });
};
