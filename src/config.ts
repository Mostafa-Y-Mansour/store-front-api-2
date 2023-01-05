import dotenv from 'dotenv';

dotenv.config();

const {
    PORT,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
    TOKEN_SECRET,
} = process.env;

export default {
    port: PORT,
    host: POSTGRES_HOST,
    dbPort: POSTGRES_PORT,
    database: process.env.NODE_ENV === 'test' ? POSTGRES_DB_TEST : POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    pepper: BCRYPT_PASSWORD,
    salt: SALT_ROUNDS,
    tokenSecret: TOKEN_SECRET,
};
