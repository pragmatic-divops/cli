/* eslint import/no-extraneous-dependencies: ['error', {'devDependencies': true}] */
import autoExternal from 'rollup-plugin-auto-external';
import json from 'rollup-plugin-json';

export default {
  input: 'src/index.js',
  plugins: [autoExternal(), json()],
  output: [{file: 'bin/pragmatic-divops.js', format: 'cjs', sourcemap: true, banner: '#!/usr/bin/env node'}]
};
