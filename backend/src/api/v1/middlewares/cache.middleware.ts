import client from "@config/redis.config"
import { Request, Response, NextFunction } from "express"

export const cacheResponse = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  client.get(`${req.baseUrl}${req.url}`, (err, rep): Response | void => {
    if (err) console.error(`Error when getting cached response: ${err}`)
    if (!rep) return next()
    return res.status(200).json(JSON.parse(rep))
  })
}
