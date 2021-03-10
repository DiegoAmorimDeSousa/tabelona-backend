import { config } from 'dotenv';

console.log('Loading env files...');

const env = process.env.NODE_ENV || 'development';

config({ path: `./config/${env}.env`});

console.log(`Env mode: ${env}!`);

export const url = process.env.MONGO_CONNECTION_STRING;
export const secret = process.env.SECRET;
export const authorize_app = process.env.AUTHORIZE_APP;
export const boteria_front = process.env.BOTERIA_FRONT;
export const url_front = process.env.URL_FRONT;
export const client_id = process.env.CLIENT_ID;
export const client_secret = process.env.CLIENT_SECRET;
export const recover_password_boteria = process.env.RECOVER_PASSWORD;
export const api_url_nuvemshop = process.env.API_URL_NUVEMSHOP;
export const list_bot = process.env.LIST_BOTS;
export const api_boteria = process.env.API_BOTERIA;
export const api_url = process.env.API_URL;
export const api_boteria_copy_template = process.env.API_BOTERIA_COPY_TEMPLATE;
export const template_id = process.env.ID_TEMPLATE_NUVEMSHOP;
export const key_boteria = process.env.KEY_BOTERIA;
