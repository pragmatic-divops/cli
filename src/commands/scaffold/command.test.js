import * as projectScaffolder from '@form8ion/project';

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'vitest-when';

import * as commonOptions from '../../common/options.js';
import {command, describe as commandDescription, handler} from './command.js';

describe('scaffold command', () => {
  beforeEach(() => {
    vi.mock('@form8ion/project');
    vi.mock('../../common/options.js');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should define the scaffold command', async () => {
    const scaffoldingResults = any.simpleObject();
    const providedDecisions = any.simpleObject();
    const decisions = any.simpleObject();
    const scaffoldOptions = any.simpleObject();
    when(commonOptions.defineDecisions).calledWith(providedDecisions).thenReturn(decisions);
    when(commonOptions.defineScaffoldOptions).calledWith(decisions).thenReturn(scaffoldOptions);
    when(projectScaffolder.scaffold).calledWith(scaffoldOptions).thenResolve(scaffoldingResults);

    expect(await handler(providedDecisions)).toEqual(scaffoldingResults);
    expect(command).toEqual('scaffold');
    expect(commandDescription).toEqual('Scaffold a new project');
  });
});
