import {resolve} from 'path';
import dotenv from 'dotenv'; 
const NODE_ENV = process.env.NODE_ENV //development or production;
dotenv.config({ path: resolve('./.env.' + NODE_ENV) });
// export const ACCESS_TOKEN_KEY: string=process.env.
export const config = {
    PORT:Number(process.env.PORT),
    db: {
        MONGODB_URI:process.env.MONGODB_URI
    },
    jwt: {
        ACCESS_KEY:process.env.ACCESS_KEY,
        REFRESH_KEY: process.env.REFRESH_KEY,
        ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
        REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
    },
    email: {
        EMAIL: process.env.EMAIL,
        PASSWORD:process.env.PASSWORD
    }
}