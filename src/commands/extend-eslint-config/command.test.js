import * as eslintConfigExtender from '@form8ion/eslint-config-extender';

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'vitest-when';

import * as commonOptions from '../../common/options.js';
import {javascriptPluginFactory} from '../../common/enhanced-plugins.js';
import {command, describe as commandDescription, handler} from './command.js';

describe('extend-eslint-config command', () => {
  beforeEach(() => {
    vi.mock('@form8ion/eslint-config-extender');
    vi.mock('../../common/options.js');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should define the command', async () => {
    const providedDecisions = any.simpleObject();
    const decisions = any.simpleObject();
    const scaffoldeOptions = any.simpleObject();
    const scaffoldingResults = any.simpleObject();
    when(commonOptions.defineDecisions).calledWith(providedDecisions).thenReturn(decisions);
    when(commonOptions.defineScaffoldOptions).calledWith(decisions).thenReturn(scaffoldeOptions);
    when(eslintConfigExtender.extendEslintConfig)
      .calledWith(scaffoldeOptions, javascriptPluginFactory)
      .thenResolve(scaffoldingResults);

    expect(await handler(providedDecisions)).toEqual(scaffoldingResults);
    expect(command).toEqual('extend-eslint-config');
    expect(commandDescription).toEqual('Extend a @form8ion shareable ESLint config');
  });
});
