import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity({ name: "DNAuth", database: "DNMembership" })
export class DNAuth {
  @PrimaryColumn({ type: "int", select: false })
  AccountDBID: number

  @Column({ type: "tinyint" })
  CertifyingStep: number
}
