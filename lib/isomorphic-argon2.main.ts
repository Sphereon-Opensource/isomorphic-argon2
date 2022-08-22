import argon2 from 'argon2-browser';

import { Argon2Mode, HashOptions, HashResult } from './types';

export * from './types';

export class Argon2 {
  static async hash(password: string | Uint8Array, salt: string | Uint8Array, opts?: HashOptions): Promise<HashResult> {
    const type: Argon2Mode =
      !opts?.mode || opts.mode === Argon2Mode.Argon2id
        ? argon2.ArgonType.Argon2id
        : opts.mode === Argon2Mode.Argon2d
        ? argon2.ArgonType.Argon2d
        : argon2.ArgonType.Argon2i;

    return await argon2
      .hash({
        // required
        pass: password,
        salt: salt,
        // optional
        time: opts?.iterations ? opts.iterations : 1, // the number of iterations
        mem: opts?.memory ? opts.memory : 1024, // used memory, in KiB
        hashLen: opts?.hashLength ? opts.hashLength : 24, // desired hash length
        parallelism: opts?.parallelism ? opts.parallelism : 1, // desired parallelism (it won't be computed in parallel, however)
        type: type, // Argon2d, Argon2i, Argon2id

        // Not supported on react-native-argon2, so commented for now
        /*
                    secret: new Uint8Array([...]), // optional secret data
                    ad: new Uint8Array([...]), // optional associated data
                    */
      })

      // result
      .then((res: { hashHex: string; encoded: string }) => {
        return {
          hex: res.hashHex,
          encoded: res.encoded,
        };
      });
  }
}
