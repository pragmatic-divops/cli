import {scaffold} from '@travi/project-scaffolder';
import {scaffold as scaffoldGithub} from '@travi/github-scaffolder';
import {scaffold as scaffoldRenovate} from '@form8ion/renovate-scaffolder';
import {defineDecisions} from '../../common/options';
import {githubPromptFactory, javascriptScaffolderFactory} from '../../common/enhanced-scaffolders';

export function handler(providedDecisions) {
  const traviName = 'Matt Travi';
  const decisions = defineDecisions(providedDecisions);

  return scaffold({
    languages: {JavaScript: javascriptScaffolderFactory(decisions)},
    vcsHosts: {
      GitHub: {scaffolder: scaffoldGithub, prompt: githubPromptFactory(decisions), public: true}
    },
    overrides: {copyrightHolder: traviName},
    dependencyUpdaters: {Renovate: {scaffolder: scaffoldRenovate}},
    decisions
  });
}

export const command = 'scaffold';
export const describe = 'Scaffold a new project';
