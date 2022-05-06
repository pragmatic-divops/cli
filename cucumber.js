const base = {
  formatOptions: {snippetInterface: 'async-await'},
  import: ['test/integration/features/**/*.js'],
  publishQuiet: true
};

export default base;

export const wip = {
  ...base,
  tags: '@wip'
};

export const noWip = {
  ...base,
  tags: 'not @wip'
};

export const focus = {
  ...base,
  tags: '@focus'
};
