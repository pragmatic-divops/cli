import {scaffold as scaffoldJavaScript} from '@travi/javascript-scaffolder';
import {scaffold as scaffoldGitHubActionsCi} from '@form8ion/github-actions-node-ci';
import {scaffold as scaffoldMocha} from '@form8ion/mocha-scaffolder';
import {prompt} from '@travi/github-scaffolder';

export function javascriptScaffolderFactory(decisions) {
  return options => scaffoldJavaScript({
    ...options,
    configs: {
      eslint: {scope: '@pragmatic-divops'},
      remark: '@pragmatic-divops/remark-preset',
      babelPreset: {name: '@form8ion', packageName: '@form8ion/babel-preset'},
      commitlint: {name: '@pragmatic-divops', packageName: '@pragmatic-divops/commitlint-config'}
    },
    overrides: {npmAccount: 'form8ion'},
    ciServices: {'GitHub Actions': {scaffolder: scaffoldGitHubActionsCi, public: true}},
    applicationTypes: {},
    packageTypes: {},
    unitTestFrameworks: {mocha: {scaffolder: scaffoldMocha}},
    decisions
  });
}

export function githubPromptFactory(decisions) {
  return () => prompt({account: 'pragmatic-divops', decisions});
}
