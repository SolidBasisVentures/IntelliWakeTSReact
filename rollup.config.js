import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

export default {
    input: [
        'src/main.ts'
    ],
    output: [
        {
            file: pkg.main,
            format: 'cjs'
	        // file: 'dist/main.js',
	        // format: 'esm'
        }
    ],
    plugins: [typescript({ objectHashIgnoreUnknownHack: false })],
    external: ['react', 'react-dom']
}
