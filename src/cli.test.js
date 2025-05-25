import {describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'vitest-when';

import * as scaffoldCommand from './commands/scaffold/command.js';
import * as liftCommand from './commands/lift/command.js';
import * as extendEslintConfigCommand from './commands/extend-eslint-config/command.js';
import cli from './cli.js';

describe('cli', () => {
  it('should register the commands', () => {
    const argv = any.simpleObject();
    const scriptName = vi.fn();
    const usage = vi.fn();
    const command = vi.fn();
    const demandCommand = vi.fn();
    const help = vi.fn();
    const alias = vi.fn();
    when(scriptName).calledWith('pragmatic-divops').thenReturn({usage});
    when(usage).calledWith('Usage: $0 <cmd> [args]').thenReturn(({command}));
    when(command).calledWith(scaffoldCommand).thenReturn({command});
    when(command).calledWith(liftCommand).thenReturn({command});
    when(command).calledWith(extendEslintConfigCommand).thenReturn({demandCommand});
    when(demandCommand).calledWith(1, 'You need at least one command before moving on').thenReturn({help});
    when(help).calledWith('h').thenReturn({alias});
    when(alias).calledWith('h', 'help').thenReturn({argv});
    const yargs = {scriptName};

    expect(cli(yargs)).toEqual(argv);
  });
});
