import { Exclude } from 'class-transformer';

export class UserEntity {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export type UserEntityTyoe = Omit<User, 'password'>;

export class UserResponse {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;
}

export class User {
  id: string;
  login: string;

  @Exclude()
  token: string;

  @Exclude()
  password: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    login: string,
    token: string,
    password: string,
    version: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.login = login;
    this.token = token;
    this.password = password;
    this.version = version;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
