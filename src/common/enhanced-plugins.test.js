import * as javascriptPlugin from '@form8ion/javascript';

import any from '@travi/any';
import {when} from 'vitest-when';
import {describe, vi, it, expect} from 'vitest';

import {javascriptScaffolderFactory} from './enhanced-scaffolders.js';
import {javascriptPluginFactory} from './enhanced-plugins.js';

vi.mock('./enhanced-scaffolders.js');

describe('enhanced plugins', () => {
  it('should pass the custom properties along with the provided options to the js plugin', async () => {
    const decisions = any.simpleObject();
    const enhancedScaffolder = () => undefined;
    when(javascriptScaffolderFactory).calledWith(decisions).thenReturn(enhancedScaffolder);

    expect(await javascriptPluginFactory(decisions))
      // eslint-disable-next-line prefer-object-spread
      .toEqual(Object.assign({}, javascriptPlugin, {scaffold: enhancedScaffolder}));
  });
});
