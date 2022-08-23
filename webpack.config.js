const path = require('path');

module.exports = {
    entry: {
        browser: './lib/isomorphic-argon2.main.ts',
    },
    mode: 'production',
    watchOptions: {
        aggregateTimeout: 600,
        ignored: /node_modules/
    },
    module: {
        noParse: /\.wasm$/,
        rules: [
            {
                test: /\.wasm$/,
                // Tells WebPack that this module should be included as
                // base64-encoded binary file and not as code
                loader: 'base64-loader',
                // Disables WebPack's opinion where WebAssembly should be,
                // makes it think that it's not WebAssembly
                //
                // Error: WebAssembly module is included in initial chunk.
                type: 'javascript/auto',
            },
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.webpack.json'
                    },
                },
                exclude: [/node_modules/, /__tests__/]
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            // Since argon2-browser supports node and browser, and we use webpack for browser, we can omit these
            path: false,
            fs: false,
            Buffer: false,
            process: false,
        }
    },
    experiments: {
        futureDefaults: true,
    },
    output: {
        filename: 'isomorphic-argon2.[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist/',
        libraryTarget: 'umd',
        // We use tsc for node and react-native, so do not clean
        clean: false

    },
};
