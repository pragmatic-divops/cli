import {describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

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
    when(scriptName).calledWith('pragmatic-divops').mockReturnValue({usage});
    when(usage).calledWith('Usage: $0 <cmd> [args]').mockReturnValue(({command}));
    when(command).calledWith(scaffoldCommand).mockReturnValue({command});
    when(command).calledWith(liftCommand).mockReturnValue({command});
    when(command).calledWith(extendEslintConfigCommand).mockReturnValue({demandCommand});
    when(demandCommand).calledWith(1, 'You need at least one command before moving on').mockReturnValue({help});
    when(help).calledWith('h').mockReturnValue({alias});
    when(alias).calledWith('h', 'help').mockReturnValue({argv});
    const yargs = {scriptName};

    expect(cli(yargs)).toEqual(argv);
  });
});
