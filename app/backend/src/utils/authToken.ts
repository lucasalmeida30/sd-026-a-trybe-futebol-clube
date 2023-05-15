import { sign, verify, SignOptions } from 'jsonwebtoken';
import IUser from '../interfaces/IUser';

const configJWT: SignOptions = {
  expiresIn: '2d',
  algorithm: 'HS256',
};
const jwtsecret = process.env.JWT_SECRET || 'jwt_secret';

const generateToken = (payload: IUser) => {
  const token = sign(payload, jwtsecret, configJWT);
  return token;
};

const validateToken = (token: string) => {
  const erro = new Error('Token not found');
  if (!token) throw erro;
  const isValid = verify(token, jwtsecret);
  if (!isValid) {
    throw new Error('Token must be a valid token');
  }
  return isValid;
};

export { validateToken, generateToken };
