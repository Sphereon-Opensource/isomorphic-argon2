export interface HashOptions {
  iterations: number;
  memory: number;
  parallelism: number;
  hashLength: number;
  mode: Argon2Mode;
}

export enum Argon2Mode {
  Argon2d = 'argon2d',
  Argon2i = 'argon2i',
  Argon2id = 'argon2id',
}

export interface HashResult {
  hex: string;
  encoded: string;
}
