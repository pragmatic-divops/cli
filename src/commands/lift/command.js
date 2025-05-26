import {ungroupObject} from '@form8ion/core';
import {lift} from '@form8ion/lift';
import {scaffold as scaffoldRenovate} from '@form8ion/renovate-scaffolder';
import {scaffold as scaffoldCucumber} from '@form8ion/cucumber-scaffolder';

import projectPlugins from '../../common/plugins.js';
import {getEnhancedCodecovScaffolder} from './enhanced-lifters.js';

export function handler({decisions}) {
  return lift({
    decisions,
    scaffolders: {
      Renovate: scaffoldRenovate,
      Cucumber: scaffoldCucumber,
      Codecov: getEnhancedCodecovScaffolder()
    },
    enhancers: ungroupObject(projectPlugins({}))
  });
}

export const command = 'lift';
export const describe = 'Lift an existing project with additional functionality';
