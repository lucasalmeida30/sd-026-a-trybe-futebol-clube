import { sign, SignOptions } from 'jsonwebtoken';
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

export default generateToken;
