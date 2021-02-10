import sql from "mssql";

export const config = {
  user: process.env.DB_USER ?? "",
  password: process.env.DB_PASSWORD ?? "",
  server: process.env.DB_HOST ?? "",
  options: {
    enableArithAbort: true,
    encrypt: true,
  },
};

export const poolPromise = new sql.ConnectionPool(config, (err: Error) => {
  if (err) throw new Error("Cannot connect to MSSQL database");
  console.log("Connected to MSSQL Database");
  console.log(`Username : ${config.user}, Server : ${config.server}`);
});
