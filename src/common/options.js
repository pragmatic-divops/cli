import {questionNames as projectQuestionNames} from '@travi/project-scaffolder';
import {questionNames as jsQuestionNames} from '@travi/javascript-scaffolder';

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
