import express from "express";
const router = express.Router();

declare module "express-session" {
  interface SessionData {
    user: {
      AccountID: number;
      AccountName: string;
      cash: number;
      claimDaily: 0 | 1;
    };
    error: {
      idError: string;
      passwordError: string;
      emailError: string;
    } | null;
    opp: number;
    cash: number | null;
    message: string | null;
    loginId: string | null;
  }
}

module.exports = router;
