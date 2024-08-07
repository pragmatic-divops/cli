import {lift} from '@form8ion/lift';
import {
  lift as liftRenovate,
  test as renovatePredicate,
  scaffold as scaffoldRenovate
} from '@form8ion/renovate-scaffolder';
import {scaffold as scaffoldCucumber} from '@form8ion/cucumber-scaffolder';
import {test as jsApplicabilityTest} from '@form8ion/javascript';
import * as githubWorkflowsPlugin from '@form8ion/github-actions-node-ci';
import * as githubPlugin from '@form8ion/github';

import {getEnhancedCodecovScaffolder, javascript as liftJavascript} from './enhanced-lifters.js';

export function handler({decisions}) {
  return lift({
    decisions,
    scaffolders: {
      Renovate: scaffoldRenovate,
      Cucumber: scaffoldCucumber,
      Codecov: getEnhancedCodecovScaffolder()
    },
    enhancers: {
      JavaScript: {test: jsApplicabilityTest, lift: liftJavascript},
      Renovate: {test: renovatePredicate, lift: liftRenovate},
      GitHub: githubPlugin,
      'GitHub Actions CI': githubWorkflowsPlugin
    }
  });
}

export const command = 'lift';
export const describe = 'Lift an existing project with additional functionality';
