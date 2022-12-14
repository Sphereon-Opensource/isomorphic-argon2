import argon2 from '@sphereon/react-native-argon2';
import * as u8a from 'uint8arrays';

import { HashOptions, HashResult } from './types';

// Export the types for RN
export * from './types';

export class Argon2 {
  /**
   * Create a Argon2 hash, using password, salt and options.
   *
   * Delegates to react-native-argon2 internally.
   *
   * @param password - The password
   * @param salt - The salt
   * @param opts - Hashing options specific to Argon2
   */
  static async hash(password: string | Uint8Array, salt: string | Uint8Array, opts?: HashOptions): Promise<HashResult> {
    const passStr = typeof password === 'string' ? password : u8a.toString(password, 'utf-8');
    const saltStr = typeof salt === 'string' ? salt : u8a.toString(salt, 'base16');
    const result = await argon2(passStr, saltStr, opts);
    return {
      hex: result.rawHash,
      encoded: result.encodedHash,
    };
  }
}
