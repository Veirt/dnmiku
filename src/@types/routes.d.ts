declare module "express-session" {
  interface SessionData {
    user: {
      AccountID: number;
      AccountName: string;
      Passphrase: Buffer;
      cash: number;
      claimDaily: 0 | 1;
    };
    error: {
      idError: string;
      passwordError: string;
      previousPasswordError: string;
      newPasswordError: string;
      emailError: string;
    } | null;
    opp: number;
    cash: number | null;
    message: string | null;
    loginId: string | null;
  }
}

export {};
