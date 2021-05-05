import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
  getConnection,
} from "typeorm";
import { Character } from "./Character";

@Entity({ name: "Accounts" })
export class Account {
  @PrimaryGeneratedColumn()
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

  @OneToMany((type) => Character, (character) => character.Account)
  Characters: Character[];

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
      const query = await getConnection(
        "DNMembership"
      ).query("SELECT [dbo].[__EncryptPassword](@0)", [password]);

      resolve(query[0][""]);
    } catch (err) {
      reject(err);
    }
  });
};
