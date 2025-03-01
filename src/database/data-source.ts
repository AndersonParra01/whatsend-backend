import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ["src/models/*.entity{.ts,.js}"],
    synchronize: true,
    logging: true,
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
})

