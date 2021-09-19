import { Character } from "@entity/DNWorld/Character";
import { CharacterStatus } from "@entity/DNWorld/CharacterStatus";
import { Request, Response, NextFunction } from "express";
import { getConnection, ILike } from "typeorm";
import passport from "passport";

export const getMyCharacters = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    passport.authenticate("jwt", { session: false }, async (err, payload) => {
        if (err) return res.status(401).json({ code: 400, message: err });
        const characterRepo = getConnection("DNWorld").getRepository(Character);
        const [characters, total] = await characterRepo.findAndCount({
            AccountID: payload.sub,
        });

        return res.status(200).json({ total, result: characters });
    })(req, res, next);
};

export const getCharacters = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const characterRepo = getConnection("DNWorld").getRepository(Character);

    const take = parseInt(req.query.take as string) || 0;
    const skip = parseInt(req.query.skip as string) || 0;
    const keyword = req.query.keyword || "";

    try {
        const [characters, total] = await characterRepo.findAndCount({
            take,
            skip,
            cache: true,
            where: {
                CharacterName: ILike(`%${keyword}%`),
            },
            relations: ["CharacterStatus"],
        });

        return res.status(200).json({ total, result: characters });
    } catch (err) {
        console.error(`Error when getting characters: ${err}`);
        return res.status(500).json({
            code: 500,
            message: "Internal server error",
            _links: {
                self: { href: `${req.baseUrl}${req.url}` },
            },
        });
    }
};

export const getCharacterById = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const characterRepo = getConnection("DNWorld").getRepository(Character);

    try {
        const character = await characterRepo.findOne(req.params.id, {
            cache: true,
            relations: ["CharacterStatus"],
        });
        if (!character) {
            return res.status(404).json({
                code: 404,
                message: "Resource not found",
                _links: { self: { href: `${req.baseUrl}${req.url}` } },
            });
        }
        return res.status(200).json(character);
    } catch (err) {
        console.error(`Error when getting character by id: ${err}`);
    }
};

export const editCharacter = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const characterRepo = getConnection("DNWorld").getRepository(Character);
    const characterStatusRepo =
        getConnection("DNWorld").getRepository(CharacterStatus);

    const { CharacterName } = req.body;
    const {
        CharacterLevel,
        SkillPoint,
        LastVillageMapID,
        Coin,
        WarehouseCoin,
        Fatigue,
        WeeklyFatigue,
        LikeCount,
        MissionScore,
    } = req.body.CharacterStatus;

    try {
        await characterRepo.update(req.params.id, {
            CharacterName,
        });

        await characterStatusRepo.update(req.params.id, {
            CharacterLevel,
            SkillPoint,
            LastVillageMapID,
            Coin,
            WarehouseCoin,
            Fatigue,
            WeeklyFatigue,
            LikeCount,
            MissionScore,
        });

        return res
            .status(204)
            .json({ code: 204, message: "Resource updated successfully" });
    } catch (err) {
        console.error(`Error when editing character: ${err}`);
        return res.status(500).json({
            code: 500,
            message: "Internal server error",
            _links: { self: { href: `${req.baseUrl}${req.url}` } },
        });
    }
};

export const deleteCharacter = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const characterRepo = getConnection("DNWorld").getRepository(Character);

    try {
        await characterRepo.delete(req.params.id);
        return res
            .status(204)
            .json({ code: 204, message: "Resource deleted successfully" });
    } catch (err) {
        console.error(`Error when deleting character: ${err}`);
    }
};
