import { DNAuth } from "../entity/DNMembership/DNAuth"
import { Account } from "../entity/DNMembership/Account"
import { Character } from "../entity/DNWorld/Character"
import checkServerPort from "../helpers/server.helper"
import { Request, Response } from "express"
import { getConnection } from "typeorm"

export const getServerStatus = async (_: Request, res: Response) => {
  return res.status(200).json({
    lastTime: new Date(),
    server: {
      village: await checkServerPort(14400),
      game: await checkServerPort(14500),
    },
  })
}

export const getPlayerStatus = async (_: Request, res: Response) => {
  const accountRepository = getConnection("DNMembership").getRepository(Account)
  const characterRepository = getConnection("DNWorld").getRepository(Character)
  const DNAuthRepository = getConnection("DNMembership").getRepository(DNAuth)

  return res.status(200).json({
    accounts: await accountRepository.count({ cache: true }),
    characters: await characterRepository.count({ cache: true }),
    online: await DNAuthRepository.count({
      cache: true,
      where: {
        CertifyingStep: 2,
      },
    }),
    lastTime: new Date(),
  })
}
