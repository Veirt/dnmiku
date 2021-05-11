import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  getConnection,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { DNAuth } from "./DNAuth";

@Entity({ name: "Accounts", database: "DNMembership" })
export class Account {
  @PrimaryGeneratedColumn({ name: "AccountID" })
  AccountId: number;

  @Column({ type: "nvarchar", length: 50, unique: true })
  AccountName: string;

  @Column({ type: "tinyint" })
  AccountLevelCode: number;

  @Column({ type: "tinyint", select: false })
  CharacterCreateLimit: number;

  @Column({ type: "tinyint", select: false })
  CharacterMaxCount: number;

  @Column({ type: "datetime2", nullable: true })
  LastLoginDate: Date;

  @Column({ type: "datetime2", default: () => "GETDATE()" })
  RegisterDate: Date;

  @Column({ type: "tinyint", select: false })
  PublisherCode: number;

  @Column({ type: "varchar", length: 32, select: false })
  Passphrase: string;

  @Column({ type: "tinyint", select: false })
  SecondAuthFailCount: number;

  @Column({ type: "tinyint", select: false })
  SecondAuthCode: number;

  @Column({ type: "bit", select: false })
  SecondAuthLockFlag: boolean;

  @Column({ type: "varchar", length: 32, select: false })
  RLKTPassword: string;

  @Column({ type: "int", nullable: false })
  cash: number;

  @Column({ type: "varchar", length: 50, unique: true })
  Email: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  DiscordID: string;

  @ManyToOne((type) => DNAuth)
  @JoinColumn({ name: "AccountID", referencedColumnName: "AccountDBID" })
  DNAuth: DNAuth;

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
    this.cash = cash;
  }
}

export const encryptPassword = (password: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = await getConnection("DNMembership").query(
        "SELECT UPPER(SUBSTRING(sys.fn_VarBinToHexStr(HASHBYTES('MD5', CAST(@0 AS VarChar(12)))),3,32)) AS EncryptedPassword",
        [password]
      );

      resolve(query[0].EncryptedPassword);
    } catch (err) {
      reject(err);
    }
  });
};
