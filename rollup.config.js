/* eslint import/no-extraneous-dependencies: ['error', {'devDependencies': true}] */
import autoExternal from 'rollup-plugin-auto-external';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.js',
  plugins: [autoExternal(), json(), nodeResolve({mainFields: ['module']})],
  output: [{file: 'bin/pragmatic-divops.js', format: 'cjs', sourcemap: true, banner: '#!/usr/bin/env node'}]
};
