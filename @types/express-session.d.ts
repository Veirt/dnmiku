import session from 'express-session'
declare module "express-session" {
  interface Session {
    user: {
      AccountID: number,
      AccountName: string,
      cash: number,
      claimDaily: 0 | 1
    }
    opp: number,
    message: string | null,
    cash: number | null
  }
}