import {octokit} from '@form8ion/github-core';
import {questionNames as projectQuestionNames} from '@form8ion/project';
import {questionNames as jsQuestionNames} from '@form8ion/javascript';
import {packageManagers} from '@form8ion/javascript-core';
import * as githubPlugin from '@form8ion/github';

import {describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'vitest-when';

import projectPlugins from './plugins.js';
import {defineDecisions, defineScaffoldOptions} from './options.js';

vi.mock('@form8ion/core');
vi.mock('@form8ion/github-core');
vi.mock('./plugins.js');

describe('options', () => {
  const traviName = 'Matt Travi';
  const orgName = 'pragmatic-divops';

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
    const octokitInstance = any.simpleObject();
    const projectPluginGroups = any.objectWithKeys(any.listOf(any.word), {factory: any.simpleObject});
    when(projectPlugins).calledWith(decisions).thenReturn(projectPluginGroups);
    when(octokit.getNetrcAuthenticatedInstance).calledWith().thenReturn(octokitInstance);

    expect(defineScaffoldOptions(decisions)).toEqual({
      plugins: projectPluginGroups,
      decisions
    });
  });
});
