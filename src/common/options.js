import {scaffold as scaffoldRenovate} from '@form8ion/renovate-scaffolder';
import {questionNames as projectQuestionNames} from '@travi/project-scaffolder';
import {questionNames as jsQuestionNames} from '@travi/javascript-scaffolder';
import {scaffold as scaffoldGithub} from '@travi/github-scaffolder';
import {githubPromptFactory, javascriptScaffolderFactory} from './enhanced-scaffolders';

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
    [jsQuestionNames.SCOPE]: orgName
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
