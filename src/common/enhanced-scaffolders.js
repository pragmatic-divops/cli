import {scaffold as scaffoldJavaScript} from '@form8ion/javascript';
import {scaffold as scaffoldGitHubActionsCi} from '@form8ion/github-actions-node-ci';
import {scaffold as scaffoldMocha} from '@form8ion/mocha-scaffolder';
import {scaffold as scaffoldEslintConfig} from '@form8ion/eslint-config-extender';
import {scaffold as scaffoldGatsby} from '@form8ion/gatsby';
import {scaffold as scaffoldNetlify} from '@travi/netlify-scaffolder';

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
    overrides: {npmAccount: 'form8ion'},
    ciServices: {'GitHub Actions': {scaffolder: scaffoldGitHubActionsCi, public: true}},
    hosts: {Netlify: {projectTypes: ['static'], scaffolder: scaffoldNetlify}},
    applicationTypes: {Gatsby: {scaffolder: scaffoldGatsby}},
    packageTypes: {'ESLint Config': {scaffolder: scaffoldEslintConfig}},
    unitTestFrameworks: {mocha: {scaffolder: scaffoldMocha}},
    decisions
  });
}
