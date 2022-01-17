import { createConnections } from "typeorm";

export default async () => {
    const env = process.env;

    return await createConnections([
        {
            name: "member",
            type: "mssql",
            host: env.DATABASE_HOST,
            username: env.DATABASE_USERNAME,
            password: env.DATABASE_PASSWORD,
            database: "DNMembership",
            extra: { trustServerCertificate: true },
            entities: ["src/entities/*.ts"],
        },
        {
            name: "world",
            type: "mssql",
            host: env.DATABASE_HOST,
            username: env.DATABASE_USERNAME,
            password: env.DATABASE_PASSWORD,
            database: "DNWorld",
            extra: { trustServerCertificate: true },
            entities: ["src/entities/*.ts"],
        },
    ]);
};
