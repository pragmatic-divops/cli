import * as javascriptScaffolder from '@form8ion/javascript';
import {scaffold as scaffoldGitHubActionsCi} from '@form8ion/github-actions-node-ci';
import {scaffold as scaffoldNetlify} from '@travi/netlify-scaffolder';
import {scaffold as scaffoldGatsby} from '@form8ion/gatsby';
import {scaffold as scaffoldEslintConfig} from '@form8ion/eslint-config-extender';
import {scaffold as scaffoldMocha} from '@form8ion/mocha-scaffolder';

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

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
      overrides: {npmAccount: 'form8ion'},
      ciServices: {'GitHub Actions': {scaffolder: scaffoldGitHubActionsCi, public: true}},
      hosts: {Netlify: {projectTypes: ['static'], scaffolder: scaffoldNetlify}},
      applicationTypes: {Gatsby: {scaffolder: scaffoldGatsby}},
      packageTypes: {'ESLint Config': {scaffolder: scaffoldEslintConfig}},
      unitTestFrameworks: {mocha: {scaffolder: scaffoldMocha}},
      decisions
    }).mockResolvedValue(output);

    expect(await javascriptScaffolderFactory(decisions)(options)).toEqual(output);
  });
});
