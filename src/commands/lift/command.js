import {lift} from '@form8ion/lift';
import {
  lift as liftRenovate,
  scaffold as scaffoldRenovate,
  test as renovatePredicate
} from '@form8ion/renovate-scaffolder';
import {scaffold as scaffoldCucumber} from '@form8ion/cucumber-scaffolder';
import * as githubWorkflowsPlugin from '@form8ion/github-actions-node-ci';
import * as githubPlugin from '@form8ion/github';

import {getEnhancedCodecovScaffolder} from './enhanced-lifters.js';
import {javascriptPluginFactory} from '../../common/enhanced-plugins.js';

export function handler({decisions}) {
  return lift({
    decisions,
    scaffolders: {
      Renovate: scaffoldRenovate,
      Cucumber: scaffoldCucumber,
      Codecov: getEnhancedCodecovScaffolder()
    },
    enhancers: {
      JavaScript: javascriptPluginFactory(decisions),
      Renovate: {test: renovatePredicate, lift: liftRenovate},
      GitHub: githubPlugin,
      'GitHub Actions CI': githubWorkflowsPlugin
    }
  });
}

export const command = 'lift';
export const describe = 'Lift an existing project with additional functionality';
