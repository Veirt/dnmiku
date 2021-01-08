"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = __importDefault(require("mssql"));
const config = {
    user: (_a = process.env.DB_USER) !== null && _a !== void 0 ? _a : "",
    password: (_b = process.env.DB_PASSWORD) !== null && _b !== void 0 ? _b : "",
    server: (_c = process.env.DB_HOST) !== null && _c !== void 0 ? _c : "",
    options: {
        enableArithAbort: true,
        encrypt: true,
    },
};
const poolPromise = new mssql_1.default.ConnectionPool(config, (err) => {
    if (err) {
        console.log(`Unexpected error : ${err}`);
        console.log("Cannot connect to MSSQL database");
    }
    else {
        console.log("Connected to MSSQL Database");
        console.log(`Username : ${config.user}, Server : ${config.server}`);
    }
});
module.exports = { config, poolPromise };
