import { DNAuth } from "@entity/DNMembership/DNAuth";
import { Account } from "@entity/DNMembership/Account";
import { Character } from "@entity/DNWorld/Character";
import { checkServerPort } from "@api/v1/helpers/server.helper";
import { Request, Response } from "express";
import { getConnection } from "typeorm";
import client from "@config/redis.config";

export const getServerStatus = async (
    req: Request,
    res: Response
): Promise<void> => {
    const response = {
        lastTime: new Date(),
        server: {
            village: await checkServerPort(14400),
            game: await checkServerPort(14500),
        },
    };

    client.setex(
        `${req.baseUrl}${req.url}`,
        5,
        JSON.stringify(response),
        (err, rep) => {
            if (err || rep !== "OK")
                console.error(
                    `Error when setting server status to Redis: ${err}`
                );
            else return res.status(200).json(response);
        }
    );
};

export const getPlayerStatus = async (
    req: Request,
    res: Response
): Promise<void> => {
    const accountRepo = getConnection("DNMembership").getRepository(Account);
    const characterRepo = getConnection("DNWorld").getRepository(Character);
    const DNAuthRepo = getConnection("DNMembership").getRepository(DNAuth);

    const response = {
        accounts: await accountRepo.count({ cache: true }),
        characters: await characterRepo.count({ cache: true }),
        online: await DNAuthRepo.count({
            cache: true,
            where: {
                CertifyingStep: 2,
            },
        }),
        lastTime: new Date(),
    };

    client.setex(
        `${req.baseUrl}${req.url}`,
        5,
        JSON.stringify(response),
        (err, rep) => {
            if (err || rep !== "OK")
                console.error(
                    `Error when setting player status to Redis: ${err}`
                );
            else return res.status(200).json(response);
        }
    );
};
