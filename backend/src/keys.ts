import dotenv from "dotenv";
dotenv.config();

export default {
    MYSQL_HOST: process.env.HOST,
    MYSQL_USER: process.env.DB_USER,
    MYSQL_PASSWORD: process.env.PASSWORD,
    MYSQL_DATABASE: process.env.DATABASE,
};