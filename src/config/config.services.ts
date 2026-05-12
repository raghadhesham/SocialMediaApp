import { resolve } from "path";
import dotenv from "dotenv";
const NODE_ENV = process.env.NODE_ENV; //development or production;
dotenv.config({ path: resolve("./.env." + NODE_ENV) });
// export const ACCESS_TOKEN_KEY: string=process.env.
export const config = {
  PORT: Number(process.env.PORT),
  db: {
    MONGODB_URI: process.env.MONGODB_URI,
    REDIS_URL: process.env.REDIS_URL,
  },
  jwt: {
    ACCESS_KEY: process.env.ACCESS_KEY,
    REFRESH_KEY: process.env.REFRESH_KEY,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
  },
  email: {
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
  },
  aws: {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    S3_REGION: process.env.S3_REGION,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  },
  firebase: {
    type: process.env.FIREBASE_TYPE,
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    clientId: process.env.FIREBASE_CLIENT_ID,
    authUri: process.env.FIREBASE_AUTH_URI,
    tokenUri: process.env.FIREBASE_TOKEN_URI,
    authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universeDomain: process.env.FIREBASE_UNIVERSE_DOMAIN,
    jsonPath: process.env.FIREBASE_JSON_PATH,
  },
};
