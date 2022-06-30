const packageScope = '@pragmatic-divops';

export const javascriptConfigs = {
  eslint: {scope: packageScope},
  remark: `${packageScope}/remark-lint-preset`,
  babelPreset: {
    name: packageScope,
    packageName: `${packageScope}/babel-preset`
  },
  commitlint: {
    name: packageScope,
    packageName: `${packageScope}/commitlint-config`
  }
};
