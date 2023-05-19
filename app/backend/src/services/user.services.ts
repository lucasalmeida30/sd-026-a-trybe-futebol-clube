import bcrypt = require('bcryptjs');
import User from '../database/models/user';
import { generateToken } from '../utils/authToken';
// import IUser from '../interfaces/IUser';

class UserService {
  constructor(private _model = User) {}

  async getUserLogin(email: string, password: string) {
    const user = await this._model.findOne({
      where: { email },
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user.dataValues);
      return { status: 200, message: { token } };
    }
    return { status: 401, message: 'Invalid email or password' };
  }

  async getRole(email: string) {
    const user = await this._model.findOne({
      where: { email },
    });
    if (user) {
      return { status: 200, message: { role: user.role } };
    }
  }
}
export default UserService;
