import checkServerPort from "../helpers/server.helper";
import { Request, Response } from "express";

export const getServerStatus = async (_: Request, res: Response) => {
  const villageServer = await checkServerPort(14400);
  const gameServer = await checkServerPort(14500);

  return res.status(200).json({ villageServer, gameServer });
};
