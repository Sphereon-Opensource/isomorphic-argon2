import argon2 from 'argon2-browser';

import { Argon2Mode, HashOptions, HashResult } from './types';

// Export the types for Node/Browser
export * from './types';

export class Argon2 {
  /**
   * Create a Argon2 hash, using password, salt and options.
   *
   * Delegates to argon2-browser internally.
   *
   * @param password - The password
   * @param salt - The salt
   * @param opts - Hashing options specific to Argon2
   */
  static async hash(password: string | Uint8Array, salt: string | Uint8Array, opts?: HashOptions): Promise<HashResult> {
    const type =
      !opts?.mode || opts.mode === Argon2Mode.Argon2id
        ? argon2.ArgonType.Argon2id
        : opts.mode === Argon2Mode.Argon2d
        ? argon2.ArgonType.Argon2d
        : argon2.ArgonType.Argon2i;

    const result = await argon2.hash({
      // required
      pass: password,
      salt: salt,
      // optional
      time: opts?.iterations ? opts.iterations : 1, // the number of iterations
      mem: opts?.memory ? opts.memory : 32 * 1024, // used memory, in KiB
      hashLen: opts?.hashLength ? opts.hashLength : 32, // desired hash length
      parallelism: opts?.parallelism ? opts.parallelism : 1, // desired parallelism (it won't be computed in parallel, however)
      type: type, // Argon2d, Argon2i, Argon2id

      /*
                    // Not supported on react-native-argon2, so commented for now
                    secret: new Uint8Array([...]), // optional secret data
                    ad: new Uint8Array([...]), // optional associated data
        */
    });

    return {
      hex: result.hashHex,
      encoded: result.encoded,
    };
  }
}
