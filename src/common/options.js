import {composeDependenciesInto} from '@form8ion/core';
import {logger} from '@form8ion/cli-core';
import {octokit} from '@form8ion/github-core';
import {packageManagers} from '@form8ion/javascript-core';
import * as renovatePlugin from '@form8ion/renovate-scaffolder';
import * as githubPlugin from '@form8ion/github';
import {questionNames as projectQuestionNames} from '@form8ion/project';
import {questionNames as jsQuestionNames} from '@form8ion/javascript';

import {github as githubPrompt} from './prompts.js';
import {javascriptPluginFactory} from './enhanced-plugins.js';

const traviName = 'Matt Travi';
const orgName = 'pragmatic-divops';
const githubPromptConstants = githubPlugin.promptConstants;
const githubDetailsPromptQuestionNames = githubPromptConstants.questionNames[githubPromptConstants.ids.GITHUB_DETAILS];

export function defineDecisions(providedDecisions) {
  return {
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
  };
}

export function defineScaffoldOptions(decisions) {
  const octokitInstance = octokit.getNetrcAuthenticatedInstance();
  const githubPluginDependencies = {logger, prompt: githubPrompt, octokit: octokitInstance};

  return {
    plugins: {
      languages: {JavaScript: javascriptPluginFactory(decisions)},
      vcsHosts: {
        GitHub: {
          ...githubPlugin,
          scaffold: composeDependenciesInto(githubPlugin.scaffold, githubPluginDependencies),
          lift: composeDependenciesInto(githubPlugin.lift, githubPluginDependencies)
        }
      },
      dependencyUpdaters: {Renovate: renovatePlugin}
    },
    decisions
  };
}
