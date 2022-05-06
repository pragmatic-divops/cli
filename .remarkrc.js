export default {
  // https://github.com/remarkjs/remark/tree/master/packages/remark-stringify#options
  settings: {
    listItemIndent: 1,
    emphasis: '_',
    strong: '_',
    bullet: '*',
    incrementListMarker: false
  },
  plugins: [
    '@pragmatic-divops/remark-preset',
    ['remark-toc', {tight: true}]
  ]
};
