import * as td from 'testdouble';
import {assert} from 'chai';
import any from '@travi/any';
import {javascriptScaffolderFactory} from '../../common/enhanced-scaffolders.js';
import {command, describe, handler} from './command.js';

suite('extend-eslint-config command', () => {
  let commonOptions, eslintConfigExtender;

  setup(async () => {
    eslintConfigExtender = await td.replaceEsm('@form8ion/eslint-config-extender');
    commonOptions = await td.replaceEsm('../../common/options.js');

    console.log({eslintConfigExtender})
  });

  teardown(() => td.reset());

  test('that the command is defined', async () => {
    const providedDecisions = any.simpleObject();
    const decisions = any.simpleObject();
    const scaffoldOptions = any.simpleObject();
    const scaffoldingResults = any.simpleObject();
    td.when(commonOptions.defineDecisions(providedDecisions)).thenReturn(decisions);
    td.when(commonOptions.defineScaffoldOptions(decisions)).thenReturn(scaffoldOptions);
    td.when(eslintConfigExtender.extendEslintConfig(/*scaffoldOptions, javascriptScaffolderFactory*/))
      .thenResolve(scaffoldingResults);

    assert.equal(await handler(providedDecisions), scaffoldingResults);
    assert.equal(command, 'extend-eslint-config');
    assert.equal(describe, 'Extend a @form8ion shareable ESLint config');
  });
});
