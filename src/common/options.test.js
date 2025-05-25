import {composeDependenciesInto} from '@form8ion/core';
import {logger} from '@form8ion/cli-core';
import {octokit} from '@form8ion/github-core';
import {questionNames as projectQuestionNames} from '@form8ion/project';
import {questionNames as jsQuestionNames} from '@form8ion/javascript';
import {packageManagers} from '@form8ion/javascript-core';
import * as renovatePlugin from '@form8ion/renovate-scaffolder';
import * as githubPlugin from '@form8ion/github';

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'vitest-when';

import {github as githubPrompt} from './prompts.js';
import {javascriptPluginFactory} from './enhanced-plugins.js';
import {defineDecisions, defineScaffoldOptions} from './options.js';

vi.mock('@form8ion/core');
vi.mock('@form8ion/github-core');

describe('options', () => {
  const traviName = 'Matt Travi';
  const orgName = 'pragmatic-divops';

  beforeEach(() => {
    vi.mock('./enhanced-plugins.js');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should define the decisions', () => {
    const providedDecisions = any.simpleObject();
    const githubPromptConstants = githubPlugin.promptConstants;
    const githubDetailsPromptQuestionNames = githubPromptConstants.questionNames[
      githubPromptConstants.ids.GITHUB_DETAILS
    ];

    expect(defineDecisions(providedDecisions)).toEqual({
      ...providedDecisions,
      [projectQuestionNames.COPYRIGHT_HOLDER]: traviName,
      [projectQuestionNames.REPO_HOST]: 'GitHub',
      [githubDetailsPromptQuestionNames.GITHUB_ACCOUNT]: orgName,
      [projectQuestionNames.DEPENDENCY_UPDATER]: 'Renovate',
      [jsQuestionNames.AUTHOR_NAME]: traviName,
      [jsQuestionNames.AUTHOR_EMAIL]: 'npm@travi.org',
      [jsQuestionNames.AUTHOR_URL]: 'https://matt.travi.org',
      [jsQuestionNames.UNIT_TEST_FRAMEWORK]: 'mocha',
      [jsQuestionNames.SCOPE]: orgName,
      [jsQuestionNames.CI_SERVICE]: 'GitHub Actions',
      [jsQuestionNames.PACKAGE_MANAGER]: packageManagers.NPM
    });
  });

  it('should define the scaffold options', () => {
    const decisions = any.simpleObject();
    const jsPlugin = any.simpleObject();
    const enhancedGithubScaffolder = () => undefined;
    const enhancedGithubLifter = () => undefined;
    const octokitInstance = any.simpleObject();
    const githubPluginDependencies = {logger, prompt: githubPrompt, octokit: octokitInstance};
    when(javascriptPluginFactory).calledWith(decisions).thenReturn(jsPlugin);
    when(octokit.getNetrcAuthenticatedInstance).calledWith().thenReturn(octokitInstance);
    when(composeDependenciesInto)
      .calledWith(githubPlugin.scaffold, githubPluginDependencies)
      .thenReturn(enhancedGithubScaffolder);
    when(composeDependenciesInto)
      .calledWith(githubPlugin.lift, githubPluginDependencies)
      .thenReturn(enhancedGithubLifter);

    expect(defineScaffoldOptions(decisions)).toEqual({
      plugins: {
        languages: {JavaScript: jsPlugin},
        vcsHosts: {
          GitHub: {
            ...githubPlugin,
            scaffold: enhancedGithubScaffolder,
            lift: enhancedGithubLifter
          }
        },
        dependencyUpdaters: {Renovate: renovatePlugin}
      },
      decisions
    });
  });
});
