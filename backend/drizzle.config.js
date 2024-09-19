/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./db/schema.js",
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL,
  }
};