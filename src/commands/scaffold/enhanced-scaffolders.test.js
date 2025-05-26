import * as javascriptScaffolder from '@form8ion/javascript';
import * as eslintConfigPlugin from '@form8ion/eslint-config-extender';
import * as githubWorkflowsNodeCiPlugin from '@form8ion/github-actions-node-ci';
import * as mochaPlugin from '@form8ion/mocha-scaffolder';
import * as gatsbyPlugin from '@form8ion/gatsby';
import * as netlifyPlugin from '@travi/netlify-scaffolder';

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'vitest-when';

import {javascriptScaffolderFactory} from './enhanced-scaffolders.js';

describe('enhanced scaffolders', () => {
  const output = any.simpleObject();
  const decisions = any.simpleObject();

  beforeEach(() => {
    vi.mock('@form8ion/javascript');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should pass along the custom properties with the provided options to the js scaffolder', async () => {
    const options = any.simpleObject();
    when(javascriptScaffolder.scaffold).calledWith({
      ...options,
      configs: {
        eslint: {scope: '@pragmatic-divops'},
        remark: '@pragmatic-divops/remark-preset',
        babelPreset: {name: '@form8ion', packageName: '@form8ion/babel-preset'},
        commitlint: {name: '@pragmatic-divops', packageName: '@pragmatic-divops/commitlint-config'}
      },
      plugins: {
        ciServices: {'GitHub Actions': githubWorkflowsNodeCiPlugin},
        hosts: {Netlify: netlifyPlugin},
        applicationTypes: {Gatsby: gatsbyPlugin},
        packageTypes: {'ESLint Config': eslintConfigPlugin},
        unitTestFrameworks: {mocha: mochaPlugin}
      },
      decisions
    }).thenResolve(output);

    expect(await javascriptScaffolderFactory(decisions)(options)).toEqual(output);
  });
});
