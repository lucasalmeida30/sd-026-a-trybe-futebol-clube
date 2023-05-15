import bcrypt = require('bcryptjs');
import User from '../database/models/user';
// import IUser from '../interfaces/IUser';
import generateToken from '../utils/authToken';

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
    return { status: 400, message: 'All fields must be filled' };
  }
}

export default UserService;
