// Include additional mocks not included in the react-native preset
import { Argon2, Argon2Mode } from '../lib/isomorphic-argon2.main';

describe('NodeJs Argon2', () => {
  it('should create hash', async () => {
    const hash = await Argon2.hash('test', 'saltsaltsaltsalsaltsalt', {
      hashLength: 32,
      memory: 1024,
      parallelism: 1,
      mode: Argon2Mode.Argon2id,
      iterations: 1,
    });
    expect(hash).toBeDefined();
    expect(hash.hex).toBeDefined();
    expect(hash.encoded).toBeDefined();
  });
});
