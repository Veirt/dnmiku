import sql from "mssql";

const config = {
  user: process.env.DB_USER ?? "sa",
  password: process.env.DB_PASS ?? "Password123",
  server: process.env.DB_HOST ?? "localhost",
  options: {
    enableArithAbort: true,
    encrypt: true,
  },
};

export const pool = new sql.ConnectionPool(config, (err: Error) => {
  if (err) throw new Error("Cannot connect to MSSQL database");
  console.log(`Username : ${config.user}, Server : ${config.server}`);
});
