import {questionNames as projectQuestionNames} from '@form8ion/project';
import {questionNames as jsQuestionNames} from '@form8ion/javascript';
import {packageManagers} from '@form8ion/javascript-core';
import * as renovatePlugin from '@form8ion/renovate-scaffolder';
import * as githubPlugin from '@form8ion/github';

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import * as enhancedScaffolders from './enhanced-scaffolders.js';
import {defineDecisions, defineScaffoldOptions} from './options.js';

describe('options', () => {
  const traviName = 'Matt Travi';
  const orgName = 'pragmatic-divops';

  beforeEach(() => {
    vi.mock('./enhanced-scaffolders');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should define the decisions', () => {
    const providedDecisions = any.simpleObject();
    const githubPromptConstants = githubPlugin.promptConstants;
    const githubDetailsPromptQuestionNames = githubPromptConstants.questionNames[
      githubPromptConstants.ids.GITHUB_DETAILS
    ];

    expect(defineDecisions(providedDecisions)).toEqual({
      ...providedDecisions,
      [projectQuestionNames.COPYRIGHT_HOLDER]: traviName,
      [projectQuestionNames.REPO_HOST]: 'GitHub',
      [githubDetailsPromptQuestionNames.GITHUB_ACCOUNT]: orgName,
      [projectQuestionNames.DEPENDENCY_UPDATER]: 'Renovate',
      [jsQuestionNames.AUTHOR_NAME]: traviName,
      [jsQuestionNames.AUTHOR_EMAIL]: 'npm@travi.org',
      [jsQuestionNames.AUTHOR_URL]: 'https://matt.travi.org',
      [jsQuestionNames.UNIT_TEST_FRAMEWORK]: 'mocha',
      [jsQuestionNames.SCOPE]: orgName,
      [jsQuestionNames.CI_SERVICE]: 'GitHub Actions',
      [jsQuestionNames.PACKAGE_MANAGER]: packageManagers.NPM
    });
  });

  it('should define the scaffold options', () => {
    const decisions = any.simpleObject();
    const jsScaffolder = () => undefined;
    when(enhancedScaffolders.javascriptScaffolderFactory).calledWith(decisions).mockReturnValue(jsScaffolder);

    expect(defineScaffoldOptions(decisions)).toEqual({
      plugins: {
        languages: {JavaScript: {scaffold: jsScaffolder}},
        vcsHosts: {GitHub: githubPlugin},
        dependencyUpdaters: {Renovate: renovatePlugin}
      },
      decisions
    });
  });
});
