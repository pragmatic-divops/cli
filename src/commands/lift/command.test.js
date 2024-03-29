import * as lifter from '@form8ion/lift';
import {
  lift as liftRenovate,
  predicate as renovatePredicate,
  scaffold as scaffoldRenovate
} from '@form8ion/renovate-scaffolder';
import {scaffold as scaffoldCucumber} from '@form8ion/cucumber-scaffolder';
import {test as jsApplicabilityTest} from '@form8ion/javascript';
import {lift as liftGithubActionsCI, test as githubActionsCiApplicabilityTest} from '@form8ion/github-actions-node-ci';

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import * as enhancedLifters from './enhanced-lifters.js';
import {command, describe as commandDescription, handler} from './index.js';

describe('lift command', () => {
  beforeEach(() => {
    vi.mock('@form8ion/lift');
    vi.mock('./enhanced-lifters.js');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should define the lift command', async () => {
    const liftingResults = any.simpleObject();
    const decisions = any.simpleObject();
    const codecovScaffolder = () => undefined;
    enhancedLifters.getEnhancedCodecovScaffolder.mockReturnValue(codecovScaffolder);
    when(lifter.lift)
      .calledWith({
        decisions,
        scaffolders: {
          Renovate: scaffoldRenovate,
          Cucumber: scaffoldCucumber,
          Codecov: codecovScaffolder
        },
        enhancers: {
          JavaScript: {test: jsApplicabilityTest, lift: enhancedLifters.javascript},
          Renovate: {test: renovatePredicate, lift: liftRenovate},
          'GitHub Actions CI': {test: githubActionsCiApplicabilityTest, lift: liftGithubActionsCI}
        }
      })
      .mockResolvedValue(liftingResults);

    expect(await handler({decisions})).toEqual(liftingResults);
    expect(command).toEqual('lift');
    expect(commandDescription).toEqual('Lift an existing project with additional functionality');
  });
});
