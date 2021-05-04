import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Account } from "./Account";

@Entity({ name: "Characters" })
export class Character {
  @PrimaryGeneratedColumn({ type: "bigint" })
  CharacterId: number;

  @ManyToOne((type) => Account, (account) => account.AccountId)
  @JoinColumn({ name: "AccountID" })
  Account: Account;

  @Column({ type: "nvarchar", length: 30 })
  CharacterName: string;

  @Column({ type: "datetime2" })
  CreateDate: Date;
}
