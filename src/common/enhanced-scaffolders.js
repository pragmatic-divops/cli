import {scaffold as scaffoldJavaScript} from '@form8ion/javascript';
import * as eslintConfigPlugin from '@form8ion/eslint-config-extender';
import * as githubWorkflowsNodeCiPlugin from '@form8ion/github-actions-node-ci';
import * as mochaPlugin from '@form8ion/mocha-scaffolder';
import * as gatsbyPlugin from '@form8ion/gatsby';
import * as netlifyPlugin from '@travi/netlify-scaffolder';

export function javascriptScaffolderFactory(decisions) {
  const scope = '@pragmatic-divops';

  return options => scaffoldJavaScript({
    ...options,
    configs: {
      eslint: {scope},
      remark: `${scope}/remark-preset`,
      babelPreset: {name: '@form8ion', packageName: '@form8ion/babel-preset'},
      commitlint: {name: scope, packageName: `${scope}/commitlint-config`}
    },
    plugins: {
      ciServices: {'GitHub Actions': githubWorkflowsNodeCiPlugin},
      hosts: {Netlify: netlifyPlugin},
      applicationTypes: {Gatsby: gatsbyPlugin},
      packageTypes: {'ESLint Config': eslintConfigPlugin},
      unitTestFrameworks: {mocha: mochaPlugin}
    },
    decisions
  });
}
