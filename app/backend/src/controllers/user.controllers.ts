import { Request, Response } from 'express';
import UserService from '../services/user.services';

export default class UserController {
  constructor(private userService = new UserService()) {
    this.getUserLogin = this.getUserLogin.bind(this);
  }

  async getUserLogin(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const userLogin = await this.userService.getUserLogin(email, password);
    if (userLogin.status === 400) {
      return res.status(400).json({ message: userLogin.message });
    }
    return res.status(200).json(userLogin.message);
  }
}
