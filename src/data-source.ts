import { DataSource } from "typeorm"
import "dotenv/config"

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
        port: 8020,
        logging: true,
        synchronize: false,
        entities: ['src/entities/*.ts'],
        migrations: ['src/migrations/*.ts']
    }
)

export default AppDataSource