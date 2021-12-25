import { v4 as uuid } from 'uuid';
import { IUser } from '../../common/types/user';

class User implements IUser {
  id: string;

  name: string;

  login: string;

  password: string;

  /**
   * Create a user
   * @param id - user's id
   * @param name - user's name
   * @param login - user's login
   * @param password - user's password
   */

  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Returns a user without a password
   * @param user - user whose password needs to be hidden
   * @returns returns a user without a password
   */

  static toResponse(user: IUser): IUser {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
