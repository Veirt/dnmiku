import express from "express";
import dotenv from "dotenv";
import { createConnection } from "typeorm";

const app = express();
createConnection();
dotenv.config();

app.use("/", require("./routes/router"));

app.listen(8080, () => console.log("Listening on http://localhost:8080"));
