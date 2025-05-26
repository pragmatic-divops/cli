import {packageManagers} from '@form8ion/javascript-core';
import * as githubPlugin from '@form8ion/github';
import {questionNames as projectQuestionNames} from '@form8ion/project';
import {questionNames as jsQuestionNames} from '@form8ion/javascript';

import projectPlugins from './plugins.js';

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
  return {
    plugins: projectPlugins(decisions),
    decisions
  };
}
