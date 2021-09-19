import jwt from "jsonwebtoken";

type Token = string;
interface Payload {
    name: string;
    mail: string;
    role: string;
}

export const signToken = (payload: Payload, subject: string): Token => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        subject,
        audience: "mikudn",
        issuer: "exlog",
        expiresIn: "30 days",
    });
};
