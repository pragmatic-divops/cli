import {extendEslintConfig} from '@form8ion/eslint-config-extender';
import {defineDecisions, defineScaffoldOptions} from '../../common/options.js';
import {javascriptScaffolderFactory} from '../../common/enhanced-scaffolders.js';

export function handler(providedDecisions) {
  // return extendEslintConfig(defineScaffoldOptions(defineDecisions(providedDecisions)), javascriptScaffolderFactory);
  console.log({extendEslintConfig})
  return extendEslintConfig(defineScaffoldOptions(defineDecisions(providedDecisions))/*, javascriptScaffolderFactory*/);
}

export const command = 'extend-eslint-config';
export const describe = 'Extend a @form8ion shareable ESLint config';
