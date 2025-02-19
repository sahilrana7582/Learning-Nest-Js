import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as brcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {
  async hash(data: string): Promise<string> {
    const hashedPass = await brcrypt.hash(data, 10);
    return hashedPass;
  }

  async compare(data: string, encrypted: string): Promise<boolean> {
    return await brcrypt.compare(data, encrypted);
  }
}
