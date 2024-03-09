// import { IUser } from '../interfaces/usersInterfaces';

export class UserEntity {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export type UserEntityTyoe = Omit<UserEntity, 'password'>;

export class UserResponce implements UserEntityTyoe {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
