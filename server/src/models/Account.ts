import { pool } from "../db/pool";
import { Sequelize, DataTypes } from "sequelize";
import sql from "mssql";

const Account = (sequelize: Sequelize) => {
  return sequelize.define(
    "Account",
    {
      AccountId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      AccountName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      AccountLevelCode: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      RLKTPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return () => this.getDataValue("RLKTPassword");
        },
      },
      LastLoginDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      RegisterDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      SecondAuthFailCount: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      SecondAuthCode: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      SecondAuthLockFlag: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      CharacterCreateLimit: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      CharacterMaxCount: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      PublisherCode: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCreate: async (account: any) => {
          account.RLKTPassword = await encryptPassword(account.RLKTPassword());
        },
      },
      updatedAt: false,
      createdAt: "RegisterDate",
    }
  );
};

export const encryptPassword = (password: string) => {
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

export default Account;
