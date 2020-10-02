import {extendEslintConfig} from '@form8ion/eslint-config-extender';
import {javascriptScaffolderFactory} from '../../common/enhanced-scaffolders';

export function handler(decisions) {
  return extendEslintConfig({decisions}, javascriptScaffolderFactory);
}

export const command = 'extend-eslint-config';
export const describe = 'Extend a @form8ion shareable ESLint config';
