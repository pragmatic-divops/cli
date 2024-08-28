import {extendEslintConfig} from '@form8ion/eslint-config-extender';

import {defineDecisions, defineScaffoldOptions} from '../../common/options.js';
import {javascriptPluginFactory} from '../../common/enhanced-plugins.js';

export function handler(providedDecisions) {
  return extendEslintConfig(defineScaffoldOptions(defineDecisions(providedDecisions)), javascriptPluginFactory);
}

export const command = 'extend-eslint-config';
export const describe = 'Extend a @form8ion shareable ESLint config';
