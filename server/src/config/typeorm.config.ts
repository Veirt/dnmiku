import { ConnectionOptions } from "typeorm";

const DNMembershipConfig: ConnectionOptions = {
  name: "DNMembership",
  type: "mssql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "DNMembership",
  options: {
    enableArithAbort: true,
  },
  synchronize: false,
  logging: false,
  entities: [
    process.env.NODE_ENV === "production"
      ? "dist/entity/DNMembership/*{.ts,.js}"
      : "src/entity/DNMembership/*{.ts,.js}",
  ],
  migrations: [
    process.env.NODE_ENV === "production"
      ? "dist/migration/DNMembership/*{.ts,.js}"
      : "src/migration/DNMembership/*{.ts,.js}",
  ],
  subscribers: [
    process.env.NODE_ENV === "production"
      ? "dist/subscriber/DNMembership/*{.ts,.js}"
      : "src/subscriber/DNMembership/*{.ts,.js}",
  ],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

const DNWorldConfig: ConnectionOptions = {
  name: "DNWorld",
  type: "mssql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "DNWorld",
  options: {
    enableArithAbort: true,
  },
  synchronize: false,
  logging: false,
  entities: [
    process.env.NODE_ENV === "production"
      ? "dist/entity/DNWorld/*{.ts,.js}"
      : "src/entity/DNWorld/*{.ts,.js}",
  ],
  migrations: [
    process.env.NODE_ENV === "production"
      ? "dist/migration/DNWorld/*{.ts,.js}"
      : "src/migration/DNWorld/*{.ts,.js}",
  ],
  subscribers: [
    process.env.NODE_ENV === "production"
      ? "dist/subscriber/DNWorld/*{.ts,.js}"
      : "src/subscriber/DNWorld/*{.ts,.js}",
  ],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

export { DNMembershipConfig, DNWorldConfig };
