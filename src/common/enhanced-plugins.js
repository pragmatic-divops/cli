import * as javascriptPlugin from '@form8ion/javascript';

import {javascriptScaffolderFactory} from './enhanced-scaffolders.js';

export function javascriptPluginFactory(decisions) {
  return {
    ...javascriptPlugin,
    scaffold: javascriptScaffolderFactory(decisions)
  };
}
