import { Character } from "../entity/DNMembership/Character";
import { Request, Response } from "express";
import { getConnection, ILike } from "typeorm";

export const getCharacters = async (req: Request, res: Response) => {
  const characterRepository = getConnection("DNMembership").getRepository(
    Character
  );

  const take = parseInt(req.query.take as string) || 0;
  const skip = parseInt(req.query.skip as string) || 0;
  const keyword = req.query.keyword || "";

  try {
    const characters = await characterRepository.find({
      take,
      skip,
      cache: true,
      where: {
        CharacterName: ILike(`%${keyword}%`),
      },
      relations: ["Account"],
      select: ["CharacterId", "CharacterName", "CreateDate", "Account"],
    });

    return res.status(200).json(characters);
  } catch (err) {
    console.error(`Error when getting characters: ${err}`);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
      _links: {
        self: { href: req.url },
      },
    });
  }
};

export const getCharacterById = async (req: Request, res: Response) => {
  const characterRepository = getConnection("DNMembership").getRepository(
    Character
  );

  try {
    const character = await characterRepository.findOne(req.params.id);
    if (!character) {
      return res.status(404).json({
        code: 404,
        message: "Resource not found",
        _links: { self: { href: req.url } },
      });
    }
    return res.status(200).json(character);
  } catch (err) {
    console.error(`Error when getting character by id: ${err}`);
  }
};

export const editCharacter = async (req: Request, res: Response) => {
  const characterRepository = getConnection("DNMembership").getRepository(
    Character
  );

  const { CharacterName } = req.body;

  try {
    await characterRepository.update(req.params.id, { CharacterName });
    return res
      .status(204)
      .json({ code: 204, message: "Resource updated successfully" });
  } catch (err) {
    console.error(`Error when editing character: ${err}`);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
      _links: { self: { href: req.url } },
    });
  }
};

export const deleteCharacter = async (req: Request, res: Response) => {
  const characterRepository = getConnection("DNMembership").getRepository(
    Character
  );

  try {
    await characterRepository.delete(req.params.id);
    return res
      .status(204)
      .json({ code: 204, message: "Resource deleted successfully" });
  } catch (err) {
    console.error(`Error when deleting character: ${err}`);
  }
};