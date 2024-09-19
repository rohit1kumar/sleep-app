import { drizzle } from "drizzle-orm/node-postgres";
import pkg from 'pg';
import dotenv from 'dotenv'
dotenv.config();

const pool = new pkg.Pool({
    connectionString: process.env.DB_URL || "postgres://postgres:postgres@localhost:5432/sleep_db"
});

export default drizzle(pool);;