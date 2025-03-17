import { config as conf } from "dotenv";
conf();
const _config = {
    port    : process.env.PORT,
    databaseURL: process.env.MONGO_DB_URL,
    env: process.env.NODE_ENV,
    jwrSecret: process.env.JWT_SECRET
}

export const config = Object.freeze( _config);