import { pool } from "../db/pool";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  Binary,
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

  @Column({ type: "binary", length: 20, nullable: true, select: false })
  GameOption: Binary;

  @Column({ type: "tinyint", select: false })
  CharacterCreateLimit: number;

  @Column({ type: "datetime2", nullable: true, select: false })
  LastCharacterCreateDate: Date;

  @Column({ type: "tinyint", select: false })
  CharacterMaxCount: number;

  @Column({ type: "datetime2", nullable: true })
  LastLoginDate: Date;

  @Column({ type: "datetime2", nullable: true })
  LastLogoutDate: Date;

  @Column({ type: "int", nullable: true, select: false })
  LastLoginIP: number;

  @Column({ type: "int", nullable: true, select: false })
  LastSessionID: number;

  @Column({ type: "int", nullable: true, select: false })
  JoinIP: number;

  @Column({ type: "datetime2", default: () => "GETDATE()" })
  RegisterDate: Date;

  @Column({ type: "tinyint", select: false })
  PublisherCode: number;

  @Column({ type: "tinyint", nullable: true, select: false })
  GenderCode: number;

  @Column({ type: "date", nullable: true, select: false })
  BirthDate: Date;

  @Column({ type: "varchar", length: 32, select: false })
  Passphrase: string;

  @Column({ type: "binary", length: 80, nullable: true, select: false })
  KeySettingOption: Binary;

  @Column({ type: "binary", length: 20, nullable: true, select: false })
  SecondAuthPassphrase: Binary;

  @Column({ type: "tinyint", select: false })
  SecondAuthFailCount: number;

  @Column({ type: "tinyint", select: false })
  SecondAuthCode: number;

  @Column({ type: "bit", select: false })
  SecondAuthLockFlag: boolean;

  @Column({ type: "date", nullable: true, select: false })
  LastSecondAuthNotifyDate: Date;

  @Column({ type: "binary", length: 201, nullable: true, select: false })
  GamePadOption: Binary;

  @Column({ type: "tinyint", nullable: true, select: false })
  NationalityCode: number;

  @Column({ type: "smalldatetime", nullable: true, select: false })
  SecondAuthResetDate: Date;

  @Column({ type: "tinyint", nullable: true, select: false })
  ChannelPartnerCode: number;

  @Column({ type: "int", nullable: true, select: false })
  TotalDT: number;

  @Column({ type: "bigint", nullable: true, select: false })
  AccountKey: number;

  @Column({ type: "tinyint", nullable: true, select: false })
  CharacterSortCode: number;

  @Column({ type: "bit", nullable: true, select: false })
  ConnectNoticeFlag: boolean;

  @Column({ type: "bit", nullable: true, select: false })
  NewbieRewardFlag: boolean;

  @Column({ type: "datetime2", nullable: true, select: false })
  NewbieRewardDate: Date;

  @Column({ type: "bit", nullable: true, select: false })
  ReturnRewardFlag: boolean;

  @Column({ type: "bit", nullable: true, select: false })
  LockFlag: boolean;

  @Column({ type: "varchar", length: 32, select: false })
  RLKTPassword: string;

  @Column({ type: "int", nullable: false })
  cash: number;

  @Column({ type: "varchar", length: 50, unique: true })
  Email: string;

  @BeforeInsert()
  async encryptPassword() {
    this.RLKTPassword = await encryptPassword(this.RLKTPassword);
    this.Passphrase = this.RLKTPassword;
  }

  constructor(
    AccountName: string,
    Email: string,
    AccountLevelCode: number,
    RLKTPassword: string,
    LastLoginDate: Date,
    SecondAuthFailCount: number,
    SecondAuthCode: number,
    SecondAuthLockFlag: boolean,
    CharacterCreateLimit: number,
    CharacterMaxCount: number,
    PublisherCode: number,
    RegisterDate: Date,
    cash: number
  ) {
    this.AccountName = AccountName;
    this.Email = Email;
    this.AccountLevelCode = AccountLevelCode;
    this.RLKTPassword = RLKTPassword;
    this.LastLoginDate = LastLoginDate;
    this.SecondAuthFailCount = SecondAuthFailCount;
    this.SecondAuthCode = SecondAuthCode;
    this.SecondAuthLockFlag = SecondAuthLockFlag;
    this.CharacterCreateLimit = CharacterCreateLimit;
    this.CharacterMaxCount = CharacterMaxCount;
    this.PublisherCode = PublisherCode;
    this.RegisterDate = RegisterDate;
  }
}

export const encryptPassword = (password: string): Promise<any> => {
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
