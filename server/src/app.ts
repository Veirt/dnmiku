require("dotenv").config();
import "reflect-metadata";
import { DNMembershipConfig, DNWorldConfig } from "./config/typeorm.config";
import express from "express";
import passport from "passport";
import { createConnection } from "typeorm";

(async () => {
  await createConnection(DNMembershipConfig);
  await createConnection(DNWorldConfig);
})();

const app = express();
app.use(passport.initialize());
app.use("/api/v1", require("./routes"));

app.listen(8080, () => console.log("Listening on http://localhost:8080"));
