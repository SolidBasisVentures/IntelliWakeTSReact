import typescript from 'rollup-plugin-typescript2'

import scss from 'rollup-plugin-scss'
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
	plugins: [scss(), typescript({objectHashIgnoreUnknownHack: false})],
	external: ['react', 'react-dom']
}
