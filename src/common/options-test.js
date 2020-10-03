import {questionNames as projectQuestionNames} from '@travi/project-scaffolder';
import {questionNames as jsQuestionNames} from '@travi/javascript-scaffolder';
import {scaffold as scaffoldRenovate} from '@form8ion/renovate-scaffolder';
import {scaffold as scaffoldGithub} from '@travi/github-scaffolder';
import {assert} from 'chai';
import any from '@travi/any';
import sinon from 'sinon';
import * as enhancedScaffolders from './enhanced-scaffolders';
import {defineDecisions, defineScaffoldOptions} from './options';

suite('options', () => {
  let sandbox;
  const traviName = 'Matt Travi';
  const orgName = 'pragmatic-divops';

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(enhancedScaffolders, 'javascriptScaffolderFactory');
    sandbox.stub(enhancedScaffolders, 'githubPromptFactory');
  });

  teardown(() => sandbox.restore());

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

  test('that scaffold options are defined', () => {
    const decisions = any.simpleObject();
    const jsScaffolder = () => undefined;
    const githubPrompt = () => undefined;
    enhancedScaffolders.javascriptScaffolderFactory.withArgs(decisions).returns(jsScaffolder);
    enhancedScaffolders.githubPromptFactory.withArgs(decisions).returns(githubPrompt);

    assert.deepEqual(
      defineScaffoldOptions(decisions),
      {
        languages: {JavaScript: jsScaffolder},
        vcsHosts: {GitHub: {scaffolder: scaffoldGithub, prompt: githubPrompt, public: true}},
        overrides: {copyrightHolder: traviName},
        dependencyUpdaters: {Renovate: {scaffolder: scaffoldRenovate}},
        decisions
      }
    );
  });
});
