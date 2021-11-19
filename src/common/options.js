import {scaffold as scaffoldRenovate} from '@form8ion/renovate-scaffolder';
import {questionNames as projectQuestionNames} from '@form8ion/project';
import {questionNames as jsQuestionNames} from '@travi/javascript-scaffolder';
import {packageManagers} from '@form8ion/javascript-core';
import {scaffold as scaffoldGithub} from '@travi/github-scaffolder';
import {githubPromptFactory, javascriptScaffolderFactory} from './enhanced-scaffolders.js';

const traviName = 'Matt Travi';
const orgName = 'pragmatic-divops';

export function defineDecisions(providedDecisions) {
  return {
    ...providedDecisions,
    [projectQuestionNames.COPYRIGHT_HOLDER]: traviName,
    [projectQuestionNames.REPO_HOST]: 'GitHub',
    [projectQuestionNames.REPO_OWNER]: orgName,
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
    languages: {JavaScript: javascriptScaffolderFactory(decisions)},
    vcsHosts: {GitHub: {scaffolder: scaffoldGithub, prompt: githubPromptFactory(decisions), public: true}},
    overrides: {copyrightHolder: traviName},
    dependencyUpdaters: {Renovate: {scaffolder: scaffoldRenovate}},
    decisions
  };
}
