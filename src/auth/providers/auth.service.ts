import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class AuthService {
  constructor(private readonly bcryptProvier: HashingProvider) {}

  public validateUser(username: string, password: string) {
    return {
      username,
      password,
    };
  }

  public async signUp(username: string, password: string) {
    const hashedPassword = await this.bcryptProvier.hash(password);
    return {
      username,
      hashedPassword,
      password,
    };
  }
}
