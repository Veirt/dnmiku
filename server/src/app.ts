require("dotenv").config();
import dbConfig from "./config/typeorm.config";
import express from "express";
import { createConnection } from "typeorm";

const app = express();
createConnection(dbConfig);

app.use("/", require("./routes"));

app.listen(8080, () => console.log("Listening on http://localhost:8080"));
