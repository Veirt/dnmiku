import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    getConnection,
    PrimaryGeneratedColumn,
} from "typeorm";
import { getAccountRepository } from "../api/v1/utils/repository";

@Entity({ name: "Accounts" })
export class Account {
    @PrimaryGeneratedColumn()
    AccountID!: number;

    @Column({ type: "nvarchar", length: 50, nullable: false })
    AccountName!: string;

    @Column({ type: "tinyint", nullable: false })
    AccountLevelCode!: number;

    @Column({ type: "tinyint", select: false, default: 4 })
    CharacterCreateLimit!: number;

    @Column({ type: "tinyint", select: false, default: 8 })
    CharacterMaxCount!: number;

    @Column({ type: "datetime2", nullable: true })
    LastLoginDate!: Date;

    @Column({ type: "datetime2", nullable: false })
    RegisterDate!: Date;

    @Column({ type: "tinyint", select: false, default: 0 })
    PublisherCode!: number;

    @Column({ type: "varchar", length: 32, select: false, nullable: true })
    Passphrase!: string;

    @Column({ type: "varchar", length: 32, select: false, nullable: true })
    RLKTPassword!: string;

    @Column({ type: "tinyint", select: false, default: 0 })
    SecondAuthFailCount!: number;

    @Column({ type: "tinyint", select: false, default: 1 })
    SecondAuthCode!: number;

    @Column({ type: "bit", select: false, default: 0 })
    SecondAuthLockFlag!: boolean;

    @Column({ type: "int", nullable: true })
    cash!: number;

    @BeforeInsert()
    fillDefaultValue() {
        this.RegisterDate = new Date();
        this.CharacterMaxCount = 8;
        this.CharacterCreateLimit = 4;
        this.PublisherCode = 0;
        this.SecondAuthFailCount = 0;
        this.SecondAuthCode = 1;
        this.SecondAuthLockFlag = false;
    }

    @BeforeInsert()
    @BeforeUpdate()
    async encryptPassword() {
        this.RLKTPassword = await encryptPassword(this.Passphrase);
        this.Passphrase = this.RLKTPassword;
    }

    async comparePassword(rawPassword: string) {
        const encryptedRawPassword = await encryptPassword(rawPassword);
        const account = await getAccountRepository().findOne(this.AccountID, {
            select: ["Passphrase"],
        });

        if (encryptedRawPassword === account?.Passphrase) {
            return true;
        }

        return false;
    }
}

const encryptPassword = (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        getConnection("member")
            .query(
                "SELECT UPPER(SUBSTRING(sys.fn_VarBinToHexStr(HASHBYTES('MD5', CAST(@0 AS VarChar(12)))),3,32)) AS EncryptedPassword",
                [password]
            )
            .then((result) => {
                resolve(result[0].EncryptedPassword);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
