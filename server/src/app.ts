require("dotenv").config();
import "reflect-metadata";
import { DNMembershipConfig, DNWorldConfig } from "./config/typeorm.config";
import express from "express";
import { createConnection } from "typeorm";

createConnection(DNMembershipConfig).then(() => {
  const app = express();
  app.use("/api/v1", require("./routes"));

  app.listen(8080, () => console.log("Listening on http://localhost:8080"));
});
