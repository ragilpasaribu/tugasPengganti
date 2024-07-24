/* eslint-disable prettier/prettier */
import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

export const koneksi = await mariadb.createConnection(
    {
        host:process.env.HOST,
        port:process.env.PORT,
        user:process.env.USER,
        password:process.env.PASSWORD,
        database:process.env.DATABASE,
    }
);
