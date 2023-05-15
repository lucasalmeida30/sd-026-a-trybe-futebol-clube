import { NextFunction, Request, Response } from 'express';

const loginValidate = (req: Request, res:Response, next: NextFunction) => {
  const { email, password } = req.body;
  const emailValidation = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const isValidate = emailValidation.test(email);

  if (!isValidate || password.length < 7) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  return next();
};

export default loginValidate;
