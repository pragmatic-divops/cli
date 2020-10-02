import {scaffold, questionNames as projectQuestionNames} from '@travi/project-scaffolder';
import {questionNames as jsQuestionNames} from '@travi/javascript-scaffolder';
import {scaffold as scaffoldGithub} from '@travi/github-scaffolder';
import {scaffold as scaffoldRenovate} from '@form8ion/renovate-scaffolder';
import {githubPromptFactory, javascriptScaffolderFactory} from '../../common/enhanced-scaffolders';

export function handler(decisions) {
  const orgName = 'pragmatic-divops';
  const traviName = 'Matt Travi';
  const decisionsWithEnhancements = {
    ...decisions,
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

  return scaffold({
    languages: {JavaScript: javascriptScaffolderFactory(decisionsWithEnhancements)},
    vcsHosts: {
      GitHub: {scaffolder: scaffoldGithub, prompt: githubPromptFactory(decisionsWithEnhancements), public: true}
    },
    overrides: {copyrightHolder: traviName},
    dependencyUpdaters: {Renovate: {scaffolder: scaffoldRenovate}},
    decisions: decisionsWithEnhancements
  });
}

export const command = 'scaffold';
export const describe = 'Scaffold a new project';
