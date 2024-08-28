import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {After, Before, Given, setWorldConstructor, When} from '@cucumber/cucumber';
import any from '@travi/any';

import stubbedFs from 'mock-fs';
import * as td from 'testdouble';

import {World} from '../support/world.js';
import {githubToken} from './vcs/github-api-steps.js';

let action,
  javascriptQuestionNames,
  dialects,
  projectQuestionNames;

const __dirname = dirname(fileURLToPath(import.meta.url));        // eslint-disable-line no-underscore-dangle
const pathToNodeModules = [__dirname, '../../../../', 'node_modules/'];
export const stubbedNodeModules = stubbedFs.load(resolve(...pathToNodeModules));

export const projectNameAnswer = 'project-name';
export const projectDescriptionAnswer = 'some project description';

setWorldConstructor(World);

Before(async function () {
  this.githubUser = any.word();
  this.visibility = any.fromList(['Public', 'Private']);
  this.projectName = projectNameAnswer;
  this.projectDescription = 'some project description';
  this.projectRoot = process.cwd();

  ({default: this.execa} = (await td.replaceEsm('@form8ion/execa-wrapper')));
  this.git = await td.replaceEsm('simple-git');
  ({questionNames: projectQuestionNames} = await import('@form8ion/project'));
  ({questionNames: javascriptQuestionNames} = await import('@form8ion/javascript'));
  ({dialects} = await import('@form8ion/javascript-core'));
  ({handler: action} = (await import('../../../../src/commands/scaffold/command.js')));

  stubbedFs({
    [`${process.env.HOME}/.netrc`]: `machine api.github.com\n  login ${githubToken}`,
    [`${process.env.HOME}/.gitconfig`]: `[github]\n\tuser = ${this.githubUser}`,
    node_modules: stubbedNodeModules
  });
});

After(function () {
  stubbedFs.restore();
  td.reset();
});

Given('the visibility of the project is {string}', async function (visibility) {
  this.visibility = visibility;
});

When(/^the project is scaffolded$/, async function () {
  const repoShouldBeCreated = this.getAnswerFor(projectQuestionNames.GIT_REPO);
  const projectLanguage = this.getAnswerFor(projectQuestionNames.PROJECT_LANGUAGE);
  const shouldBeScoped = any.boolean();

  await action({
    [projectQuestionNames.PROJECT_NAME]: projectNameAnswer,
    [projectQuestionNames.DESCRIPTION]: projectDescriptionAnswer,
    [projectQuestionNames.VISIBILITY]: this.visibility,
    [projectQuestionNames.DEPENDENCY_UPDATER]: any.word(),
    ...'Public' === this.visibility && {
      [projectQuestionNames.LICENSE]: 'MIT',
      [projectQuestionNames.COPYRIGHT_YEAR]: 2000
    },
    ...'Private' === this.visibility && {[projectQuestionNames.UNLICENSED]: true},
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
