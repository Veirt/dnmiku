import { createConnections } from "typeorm";

export default async () => {
    return await createConnections();
};
