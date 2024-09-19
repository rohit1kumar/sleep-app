import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import dotenv from 'dotenv'
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DB_URL || "postgres://postgres:postgres@localhost:5432/sleep_db"
});

export default drizzle(pool);;