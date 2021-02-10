import { readFileSync } from "fs";

const privateKey = readFileSync("ssl/dnmiku.key", "utf8");
const certificate = readFileSync("ssl/dnmiku.crt", "utf8");
export const credentials = { key: privateKey, cert: certificate };
