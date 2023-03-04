import {resolve} from 'path';
import {After, Before, setWorldConstructor, When} from '@cucumber/cucumber';
import any from '@travi/any';

import stubbedFs from 'mock-fs';
import td from 'testdouble';
import {World} from '../support/world';
import {githubToken} from './vcs/github-api-steps';

let action,
  javascriptQuestionNames,
  dialects,
  projectQuestionNames;

const pathToNodeModules = [__dirname, '../../../../', 'node_modules/'];
const stubbedNodeModules = stubbedFs.load(resolve(...pathToNodeModules));

export const projectNameAnswer = 'project-name';
export const projectDescriptionAnswer = 'some project description';

setWorldConstructor(World);

Before(async function () {
  this.githubUser = any.word();

  // work around for overly aggressive mock-fs, see:
  // https://github.com/tschaub/mock-fs/issues/213#issuecomment-347002795
  require('color-convert'); // eslint-disable-line import/no-extraneous-dependencies

  this.execa = td.replace('execa');
  ({questionNames: projectQuestionNames} = require('@form8ion/project'));
  ({questionNames: javascriptQuestionNames} = require('@form8ion/javascript'));
  ({dialects} = require('@form8ion/javascript-core'));
  action = require('../../../../src/commands/scaffold/command').handler;

  stubbedFs({
    [`${process.env.HOME}/.netrc`]: `machine github.com\n  login ${githubToken}`,
    [`${process.env.HOME}/.gitconfig`]: `[github]\n\tuser = ${this.githubUser}`,
    node_modules: stubbedNodeModules
  });
});

After(function () {
  stubbedFs.restore();
  td.reset();
});

When(/^the project is scaffolded$/, async function () {
  const visibility = any.fromList(['Public', 'Private']);
  const repoShouldBeCreated = this.getAnswerFor(projectQuestionNames.GIT_REPO);
  const projectLanguage = this.getAnswerFor(projectQuestionNames.PROJECT_LANGUAGE);
  const shouldBeScoped = any.boolean();

  await action({
    [projectQuestionNames.PROJECT_NAME]: projectNameAnswer,
    [projectQuestionNames.DESCRIPTION]: projectDescriptionAnswer,
    [projectQuestionNames.VISIBILITY]: visibility,
    [projectQuestionNames.DEPENDENCY_UPDATER]: any.word(),
    ...'Public' === visibility && {
      [projectQuestionNames.LICENSE]: 'MIT',
      [projectQuestionNames.COPYRIGHT_YEAR]: 2000
    },
    ...'Private' === visibility && {[projectQuestionNames.UNLICENSED]: true},
    [projectQuestionNames.GIT_REPO]: repoShouldBeCreated,
    [projectQuestionNames.PROJECT_LANGUAGE]: projectLanguage,
    ...'JavaScript' === projectLanguage && {
      [javascriptQuestionNames.NODE_VERSION_CATEGORY]: 'LTS',
      [javascriptQuestionNames.PROJECT_TYPE]: 'Package',
      [javascriptQuestionNames.DIALECT]: dialects.BABEL,
      [javascriptQuestionNames.UNIT_TESTS]: true,
      [javascriptQuestionNames.INTEGRATION_TESTS]: true,
      [javascriptQuestionNames.CI_SERVICE]: 'Travis',
      [javascriptQuestionNames.CONFIGURE_LINTING]: true,
      [javascriptQuestionNames.PROJECT_TYPE_CHOICE]: 'Other',
      [javascriptQuestionNames.SHOULD_BE_SCOPED]: shouldBeScoped,
      [javascriptQuestionNames.PROVIDE_EXAMPLE]: true
    }
  });
});
