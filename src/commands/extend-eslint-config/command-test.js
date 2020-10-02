import * as eslintConfigExtender from '@form8ion/eslint-config-extender';
import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';
import {command, describe, handler} from './command';
import {javascriptScaffolderFactory} from '../../common/enhanced-scaffolders';

suite('extend-eslint-config command', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(eslintConfigExtender, 'extendEslintConfig');
  });

  teardown(() => sandbox.restore());

  test('that the command is defined', async () => {
    const decisions = any.simpleObject();
    const scaffoldingResults = any.simpleObject();
    eslintConfigExtender.extendEslintConfig
      .withArgs({decisions}, javascriptScaffolderFactory)
      .resolves(scaffoldingResults);

    assert.equal(await handler(decisions), scaffoldingResults);
    assert.equal(command, 'extend-eslint-config');
    assert.equal(describe, 'Extend a @form8ion shareable ESLint config');
  });
});
