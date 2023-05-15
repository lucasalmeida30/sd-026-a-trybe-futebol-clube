import { NextFunction, Request, Response } from 'express';

const fieldsValidate = (req: Request, res:Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  return next();
};

export default fieldsValidate;
