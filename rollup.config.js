/* eslint import/no-extraneous-dependencies: ['error', {'devDependencies': true}] */
import autoExternal from 'rollup-plugin-auto-external';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import executable from 'rollup-plugin-executable';

export default {
  input: 'src/index.js',
  plugins: [
    autoExternal(),
    json(),
    executable(),
    nodeResolve({mainFields: ['module']})
  ],
  external: ['source-map-support/register'],
  output: [{file: 'bin/pragmatic-divops.js', format: 'cjs', sourcemap: true, banner: '#!/usr/bin/env node'}]
};
