import sql from "mssql";

const config = {
  user: process.env.DB_USER ?? "",
  password: process.env.DB_PASSWORD ?? "",
  server: process.env.DB_HOST ?? "",
  options: {
    enableArithAbort: true,
    encrypt: true,
  },
};

const poolPromise = new sql.ConnectionPool(config, (err: Error) => {
  if (err) {
    console.log(`Unexpected error : ${err}`);
    throw new Error("Cannot connect to MSSQL database");
  } else {
    console.log("Connected to MSSQL Database");
    console.log(`Username : ${config.user}, Server : ${config.server}`);
  }
});

module.exports = { config, poolPromise };
