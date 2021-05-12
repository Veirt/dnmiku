import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from "typeorm"
import { CharacterStatus } from "./CharacterStatus"

@Entity({ name: "Characters", database: "DNWorld" })
export class Character {
  @PrimaryGeneratedColumn({ type: "bigint" })
  CharacterID: number

  @Column({ type: "int", nullable: false, select: false })
  AccountID: number

  @Column({ type: "nvarchar", length: 50, nullable: false })
  AccountName: string

  @Column({ type: "nvarchar", length: 30, nullable: false })
  CharacterName: string

  @Column({ type: "tinyint", nullable: false })
  CharacterClassCode: number

  @Column({ type: "int" })
  DefaultBody: number

  @Column({ type: "int" })
  DefaultLeg: number

  @Column({ type: "int" })
  DefaultHand: number

  @Column({ type: "int" })
  DefaultFoot: number

  @Column({ type: "bit" })
  DeleteFlag: boolean

  @Column({ type: "datetime2" })
  CreateDate: Date

  @ManyToOne(() => CharacterStatus)
  @JoinColumn({ name: "CharacterID" })
  CharacterStatus: CharacterStatus
}
