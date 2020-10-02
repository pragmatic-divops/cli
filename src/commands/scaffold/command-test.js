import * as projectScaffolder from '@travi/project-scaffolder';
import {scaffold as scaffoldGithub} from '@travi/github-scaffolder';
import {scaffold as scaffoldRenovate} from '@form8ion/renovate-scaffolder';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import * as commonOptions from '../../common/options';
import * as enhancedScaffolders from '../../common/enhanced-scaffolders';
import {command, describe, handler} from '.';

suite('scaffold command', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(projectScaffolder, 'scaffold');
    sandbox.stub(commonOptions, 'defineDecisions');
    sandbox.stub(enhancedScaffolders, 'javascriptScaffolderFactory');
    sandbox.stub(enhancedScaffolders, 'githubPromptFactory');
  });

  teardown(() => sandbox.restore());

  test('that the scaffold command is defined', async () => {
    const scaffoldingResults = any.simpleObject();
    const providedDecisions = any.simpleObject();
    const decisions = any.simpleObject();
    const jsScaffolder = () => undefined;
    const githubPrompt = () => undefined;
    commonOptions.defineDecisions.withArgs(providedDecisions).returns(decisions);
    enhancedScaffolders.javascriptScaffolderFactory.withArgs(decisions).returns(jsScaffolder);
    enhancedScaffolders.githubPromptFactory.withArgs(decisions).returns(githubPrompt);
    projectScaffolder.scaffold
      .withArgs({
        languages: {JavaScript: jsScaffolder},
        vcsHosts: {GitHub: {scaffolder: scaffoldGithub, prompt: githubPrompt, public: true}},
        overrides: {copyrightHolder: 'Matt Travi'},
        dependencyUpdaters: {Renovate: {scaffolder: scaffoldRenovate}},
        decisions
      })
      .resolves(scaffoldingResults);

    assert.equal(await handler(providedDecisions), scaffoldingResults);
    assert.equal(command, 'scaffold');
    assert.equal(describe, 'Scaffold a new project');
  });
});
