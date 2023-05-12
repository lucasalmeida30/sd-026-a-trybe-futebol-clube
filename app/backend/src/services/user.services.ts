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

    if (!user) {
      return { type: 'INVALID EMAIL', message: 'All fields must be filled' };
    }
    const rashIsValid = bcrypt.compareSync(password, user.password);

    if (!rashIsValid) {
      return { type: 'INVALID PASSWORD', message: 'All fields must be filled' };
    }

    const token = generateToken(user.dataValues);
    return { type: null, message: { token } };
  }
}

export default UserService;
