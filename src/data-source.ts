import { DataSource } from "typeorm"
import "dotenv/config"
import path from "path"

const AppDataSource = new DataSource(
    process.env.NODE_ENV === "test" ?
    {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/*.ts"]
    } :
    {
        type: "postgres",
        host: process.env.HOST,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        port: process.env.PORT ? 8020 : 5432,
        logging: true,
        synchronize: false,
        entities: [path.join(__dirname, "./entities/*.{js,ts}")],
        migrations: [path.join(__dirname, "./migrations/*.{js,ts}")],
    }
)

export default AppDataSource