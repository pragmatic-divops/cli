import {composeDependenciesInto} from '@form8ion/core';
import {logger} from '@form8ion/cli-core';
import {octokit} from '@form8ion/github-core';
import * as javascriptPlugin from '@form8ion/javascript';
import * as githubPlugin from '@form8ion/github';

import any from '@travi/any';
import {when} from 'vitest-when';
import {describe, vi, it, expect} from 'vitest';

import {github as githubPrompt} from './prompts.js';
import {javascriptScaffolderFactory} from './enhanced-scaffolders.js';
import {javascriptPluginFactory, githubPluginFactory} from './enhanced-plugins.js';

vi.mock('@form8ion/core');
vi.mock('@form8ion/github-core');
vi.mock('./enhanced-scaffolders.js');

describe('enhanced plugins', () => {
  it('should pass the custom properties along with the provided options to the js plugin', async () => {
    const decisions = any.simpleObject();
    const enhancedScaffolder = () => undefined;
    when(javascriptScaffolderFactory).calledWith(decisions).thenReturn(enhancedScaffolder);

    expect(await javascriptPluginFactory(decisions))
      // eslint-disable-next-line prefer-object-spread
      .toEqual(Object.assign({}, javascriptPlugin, {scaffold: enhancedScaffolder}));
  });

  it('should inject dependencies into the github plugin', async () => {
    const enhancedScaffolder = () => undefined;
    const enhancedLifter = () => undefined;
    const octokitInstance = any.simpleObject();
    const dependencies = {octokit: octokitInstance, prompt: githubPrompt, logger};
    when(octokit.getNetrcAuthenticatedInstance).calledWith().thenReturn(octokitInstance);
    when(composeDependenciesInto).calledWith(githubPlugin.scaffold, dependencies).thenReturn(enhancedScaffolder);
    when(composeDependenciesInto).calledWith(githubPlugin.lift, dependencies).thenReturn(enhancedLifter);

    // eslint-disable-next-line prefer-object-spread
    expect(githubPluginFactory()).toEqual(Object.assign(
      {},
      githubPlugin,
      {scaffold: enhancedScaffolder, lift: enhancedLifter}
    ));
  });
});
