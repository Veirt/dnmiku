import dotenv from "dotenv";
dotenv.config();

import { DNMembershipConfig, DNWorldConfig } from "@config/typeorm.config";

import apiv1Routes from "@api/v1/routes";

import { createConnection } from "typeorm";
import express from "express";
import compression from "compression";
import passport from "passport";
import "reflect-metadata";

(async () => {
    await createConnection(DNMembershipConfig);
    await createConnection(DNWorldConfig);
})();

const app = express();
app.use(compression());
app.use(passport.initialize());
app.use("/api/v1", apiv1Routes);

app.listen(8080, () => console.log("Listening on http://localhost:8080"));
