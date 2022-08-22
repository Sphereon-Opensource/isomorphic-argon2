Argon2.hash('test', 'saltsalsalsaltsalsalt', {
    hashLength: 32,
    memory: 1024,
    parallelism: 1,
    mode: Argon2Mode.Argon2id,
    iterations: 1
}).then(hash => {
    if (document && document.querySelector('pre')) {
        document.querySelector('pre').innerText =
            'Seems like it worked:\n' +
            `Encoded: ${hash.encoded}\n` +
            `Hex: ${hash.hex}\n`;
    } else {
        console.log(`Hex hash: ${hash.hex}, Encoded: ${hash.encoded}`)
    }
}).catch(e => console.error('Error: ', e));
