import {ungroupObject} from '@form8ion/core';
import * as lifter from '@form8ion/lift';
import {scaffold as scaffoldRenovate} from '@form8ion/renovate-scaffolder';
import {scaffold as scaffoldCucumber} from '@form8ion/cucumber-scaffolder';

import {describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'vitest-when';

import projectPlugins from '../../common/plugins.js';
import * as enhancedLifters from './enhanced-lifters.js';
import {command, describe as commandDescription, handler} from './index.js';

vi.mock('@form8ion/core');
vi.mock('@form8ion/lift');
vi.mock('../../common/plugins.js');
vi.mock('./enhanced-lifters.js');

describe('lift command', () => {
  it('should define the lift command', async () => {
    const liftingResults = any.simpleObject();
    const decisions = any.simpleObject();
    const codecovScaffolder = () => undefined;
    const projectPluginGroups = any.objectWithKeys(any.listOf(any.word), {factory: any.simpleObject});
    const ungroupedPlugins = any.simpleObject();
    when(projectPlugins).calledWith({}).thenReturn(projectPluginGroups);
    when(ungroupObject).calledWith(projectPluginGroups).thenReturn(ungroupedPlugins);
    enhancedLifters.getEnhancedCodecovScaffolder.mockReturnValue(codecovScaffolder);
    when(lifter.lift)
      .calledWith({
        decisions,
        scaffolders: {
          Renovate: scaffoldRenovate,
          Cucumber: scaffoldCucumber,
          Codecov: codecovScaffolder
        },
        enhancers: ungroupedPlugins
      })
      .thenResolve(liftingResults);

    expect(await handler({decisions})).toEqual(liftingResults);
    expect(command).toEqual('lift');
    expect(commandDescription).toEqual('Lift an existing project with additional functionality');
  });
});
