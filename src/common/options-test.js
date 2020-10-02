import {assert} from 'chai';
import any from '@travi/any';
import {questionNames as projectQuestionNames} from '@travi/project-scaffolder';
import {questionNames as jsQuestionNames} from '@travi/javascript-scaffolder';
import {defineDecisions} from './options';

suite('options', () => {
  const traviName = 'Matt Travi';
  const orgName = 'pragmatic-divops';

  test('that decisions are defined', () => {
    const providedDecisions = any.simpleObject();

    assert.deepEqual(
      defineDecisions(providedDecisions),
      {
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
      }
    );
  });
});
