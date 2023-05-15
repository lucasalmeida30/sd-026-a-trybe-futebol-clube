import { NextFunction, Request, Response } from 'express';
import { validateToken } from '../utils/authToken';

const validateTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  try {
    const retornoToken = validateToken(authorization);
    if (retornoToken) {
      req.body.user = retornoToken;
      return next();
    }
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateTokenMiddleware;
