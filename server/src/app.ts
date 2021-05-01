require("dotenv").config();
import "reflect-metadata";
import dbConfig from "./config/typeorm.config";
import express from "express";
import { createConnection } from "typeorm";

createConnection(dbConfig).then(() => {
  const app = express();
  app.use("/", require("./routes"));

  app.listen(8080, () => console.log("Listening on http://localhost:8080"));
});
