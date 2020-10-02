import * as eslintConfigExtender from '@form8ion/eslint-config-extender';
import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';
import * as commonOptions from '../../common/options';
import {javascriptScaffolderFactory} from '../../common/enhanced-scaffolders';
import {command, describe, handler} from './command';

suite('extend-eslint-config command', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(eslintConfigExtender, 'extendEslintConfig');
    sandbox.stub(commonOptions, 'defineDecisions');
  });

  teardown(() => sandbox.restore());

  test('that the command is defined', async () => {
    const providedDecisions = any.simpleObject();
    const decisions = any.simpleObject();
    const scaffoldingResults = any.simpleObject();
    commonOptions.defineDecisions.withArgs(providedDecisions).returns(decisions);
    eslintConfigExtender.extendEslintConfig
      .withArgs({decisions}, javascriptScaffolderFactory)
      .resolves(scaffoldingResults);

    assert.equal(await handler(providedDecisions), scaffoldingResults);
    assert.equal(command, 'extend-eslint-config');
    assert.equal(describe, 'Extend a @form8ion shareable ESLint config');
  });
});
