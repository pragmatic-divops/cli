import * as jsLifter from '@form8ion/javascript';
import * as codecovPlugin from '@form8ion/codecov';

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'vitest-when';

import {getEnhancedCodecovScaffolder, javascript} from './enhanced-lifters.js';

describe('enhanced lifters', () => {
  const options = any.simpleObject();
  const results = any.simpleObject();
  const packageScope = '@pragmatic-divops';

  beforeEach(() => {
    vi.mock('@form8ion/javascript');
    vi.mock('@form8ion/codecov');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should pass the custom properties along with the provided options to the js lifter', async () => {
    when(jsLifter.lift).calledWith({
      ...options,
      configs: {
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
      }
    }).thenResolve(results);

    expect(await javascript(options)).toEqual(results);
  });

  it('should set the visibility to `Public` for Codecov since all projects in this org are public', async () => {
    const scaffolder = getEnhancedCodecovScaffolder();
    when(codecovPlugin.scaffold).calledWith({...options, visibility: 'Public'}).thenResolve(results);

    expect(await scaffolder(options)).toEqual(results);
  });
});
