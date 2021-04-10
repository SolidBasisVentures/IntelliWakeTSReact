import typescript from 'rollup-plugin-typescript2'

import scss from 'rollup-plugin-scss'
import copy from 'rollup-plugin-copy'
import pkg from './package.json'

export default {
	input: ['src/main.ts'],
	output: [
		{
			file: pkg.main,
			format: 'cjs'
			// file: 'dist/main.js',
			// format: 'esm'
		}
	],
	plugins: [
		scss(),
		typescript({objectHashIgnoreUnknownHack: false}),
		copy({
			targets: [{src: 'src/IWake.scss', dest: 'dist'}]
		})
	],
	external: ['react', 'react-dom']
}
