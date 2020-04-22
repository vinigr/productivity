import dotenv from 'dotenv';

const ENV = process.env;

dotenv.config();

export const MONGO_URL = ENV.MONGO_URL || 'mongodb://localhost/database';

export const GRAPHQL_PORT = ENV.GRAPHQL_PORT || 3333;
