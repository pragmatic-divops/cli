import * as lifter from '@form8ion/lift';
import {
  lift as liftRenovate,
  scaffold as scaffoldRenovate,
  test as renovatePredicate
} from '@form8ion/renovate-scaffolder';
import {scaffold as scaffoldCucumber} from '@form8ion/cucumber-scaffolder';
import * as githubWorkflowsPlugin from '@form8ion/github-actions-node-ci';
import * as githubPlugin from '@form8ion/github';

import {describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import {javascriptPluginFactory} from '../../common/enhanced-plugins.js';
import * as enhancedLifters from './enhanced-lifters.js';
import {command, describe as commandDescription, handler} from './index.js';

vi.mock('@form8ion/lift');
vi.mock('./enhanced-lifters.js');
vi.mock('../../common/enhanced-plugins.js');

describe('lift command', () => {
  it('should define the lift command', async () => {
    const liftingResults = any.simpleObject();
    const decisions = any.simpleObject();
    const codecovScaffolder = () => undefined;
    enhancedLifters.getEnhancedCodecovScaffolder.mockReturnValue(codecovScaffolder);
    const javascriptPlugin = any.simpleObject();
    when(javascriptPluginFactory).calledWith(decisions).mockReturnValue(javascriptPlugin);
    when(lifter.lift)
      .calledWith({
        decisions,
        scaffolders: {
          Renovate: scaffoldRenovate,
          Cucumber: scaffoldCucumber,
          Codecov: codecovScaffolder
        },
        enhancers: {
          JavaScript: javascriptPlugin,
          Renovate: {test: renovatePredicate, lift: liftRenovate},
          GitHub: githubPlugin,
          'GitHub Actions CI': githubWorkflowsPlugin
        }
      })
      .mockResolvedValue(liftingResults);

    expect(await handler({decisions})).toEqual(liftingResults);
    expect(command).toEqual('lift');
    expect(commandDescription).toEqual('Lift an existing project with additional functionality');
  });
});
