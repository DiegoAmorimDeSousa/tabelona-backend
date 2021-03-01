import jwt from 'jsonwebtoken';

import { secret } from '../utils/config';


const createToken = (params) => {
  return jwt.sign(params, secret || '', { expiresIn: 43200});
}

export default createToken;
