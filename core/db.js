const sql = require('mssql');
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB,
    options: {
        enableArithAbort: true,
        encrypt: true
    }
}
const poolPromise = new sql.ConnectionPool(config, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Connected to MSSQL Database")
    }
})

module.exports = {
    config,
    poolPromise
}