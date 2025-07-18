const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3001;
const SALT_ROUND = parseInt(process.env.SALT_ROUND) || 10;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "authentication_key";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const DB_SYNC = process.env.DB_SYNC === 'true';

module.exports = {
    PORT,
    SALT_ROUND,
    JWT_SECRET_KEY,
    CLIENT_URL,
    DB_SYNC
};