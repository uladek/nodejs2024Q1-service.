// import { IUser } from '../interfaces/usersInterfaces';

import { Exclude } from 'class-transformer';
import { User } from '../interfaces/usersInterfaces';

export class UserEntity {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export type UserEntityTyoe = Omit<User, 'password'>;

// export class UserResponce implements UserEntityTyoe {
//   id: string;
//   login: string;
//   version: number;
//   createdAt: number;
//   updatedAt: number;
// }

export class UserResponse {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;
}
