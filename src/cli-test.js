import any from '@travi/any';
import {assert} from 'chai';
import sinon from 'sinon';
import * as scaffoldCommand from './commands/scaffold/index.js';
import * as extendEslintConfigCommand from './commands/extend-eslint-config/index.js';
import cli from './cli.js';

suite('cli', () => {
  test('that commands are registered', () => {
    const argv = any.simpleObject();
    const scriptName = sinon.stub();
    const usage = sinon.stub();
    const command = sinon.stub();
    const demandCommand = sinon.stub();
    const help = sinon.stub();
    const alias = sinon.stub();
    scriptName.withArgs('pragmatic-divops').returns({usage});
    usage.withArgs('Usage: $0 <cmd> [args]').returns({command});
    command.withArgs(scaffoldCommand).returns({command});
    command.withArgs(extendEslintConfigCommand).returns({demandCommand});
    demandCommand.withArgs(1, 'You need at least one command before moving on').returns({help});
    help.withArgs('h').returns({alias});
    alias.withArgs('h', 'help').returns({argv});
    const yargs = {scriptName};

    assert.equal(cli(yargs), argv);
  });
});
