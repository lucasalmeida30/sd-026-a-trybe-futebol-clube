import { Request, Response } from 'express';
import UserService from '../services/user.services';

export default class UserController {
  constructor(private userService = new UserService()) {
    this.getUserLogin = this.getUserLogin.bind(this);
    this.getRole = this.getRole.bind(this);
  }

  async getUserLogin(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const userLogin = await this.userService.getUserLogin(email, password);
    // if (userLogin.status === 401) {
    //   return res.status(401).json({ message: userLogin.message });
    // }
    return res.status(200).json(userLogin.message);
  }

  async getRole(req: Request, res: Response) {
    const { email } = req.body.user;
    const user = await this.userService.getRole(email);
    if (user) return res.status(user.status).json(user.message);
  }
}
