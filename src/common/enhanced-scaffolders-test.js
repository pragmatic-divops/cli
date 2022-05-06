import * as javascriptScaffolder from '@form8ion/javascript';
import * as githubScaffolder from '@travi/github-scaffolder';
import {scaffold as scaffoldGitHubActionsCi} from '@form8ion/github-actions-node-ci';
import {scaffold as scaffoldMocha} from '@form8ion/mocha-scaffolder';
import {scaffold as scaffoldEslintConfig} from '@form8ion/eslint-config-extender';
import {scaffold as scaffoldGatsby} from '@form8ion/gatsby';
import {scaffold as scaffoldNetlify} from '@travi/netlify-scaffolder';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import {javascriptScaffolderFactory, githubPromptFactory} from './enhanced-scaffolders';

suite('enhanced scaffolders', () => {
  let sandbox;
  const output = any.simpleObject();
  const decisions = any.simpleObject();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(javascriptScaffolder, 'scaffold');
    sandbox.stub(githubScaffolder, 'prompt');
  });

  teardown(() => sandbox.restore());

  test('that the custom properties are passed along with the provided options to the js scaffolder', async () => {
    const options = any.simpleObject();
    javascriptScaffolder.scaffold
      .withArgs({
        ...options,
        configs: {
          eslint: {scope: '@pragmatic-divops'},
          remark: '@pragmatic-divops/remark-preset',
          babelPreset: {name: '@form8ion', packageName: '@form8ion/babel-preset'},
          commitlint: {name: '@pragmatic-divops', packageName: '@pragmatic-divops/commitlint-config'}
        },
        overrides: {npmAccount: 'form8ion'},
        ciServices: {'GitHub Actions': {scaffolder: scaffoldGitHubActionsCi, public: true}},
        hosts: {Netlify: {projectTypes: ['static'], scaffolder: scaffoldNetlify}},
        applicationTypes: {Gatsby: {scaffolder: scaffoldGatsby}},
        packageTypes: {'ESLint Config': {scaffolder: scaffoldEslintConfig}},
        unitTestFrameworks: {mocha: {scaffolder: scaffoldMocha}},
        decisions
      })
      .resolves(output);

    assert.equal(await javascriptScaffolderFactory(decisions)(options), output);
  });

  test('that the owner account is passed to the github prompts', async () => {
    githubScaffolder.prompt.withArgs({account: 'pragmatic-divops', decisions}).resolves(output);

    assert.equal(await githubPromptFactory(decisions)(), output);
  });
});
