import { Sequelize } from "sequelize";
import AccountModel from "./models/Account";

const sequelize = new Sequelize(
  process.env.DB_NAME ?? "DNMembership",
  process.env.DB_USER ?? "sa",
  process.env.DB_PASS ?? "Password123",
  {
    host: "localhost",
    dialect: "mssql",
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to MSSQL Database");
  } catch (err) {
    console.error("Cannot connect to MSSQL Database");
    console.error(err);
  }
})();

const Account = AccountModel(sequelize);

export default Account;
