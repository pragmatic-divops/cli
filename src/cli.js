import * as scaffoldCommand from './commands/scaffold/command.js';
import * as liftCommand from './commands/lift/command.js';
import * as extendEslintConfigCommand from './commands/extend-eslint-config/command.js';

export default function cli(yargs) {
  return yargs
    .scriptName('pragmatic-divops')
    .usage('Usage: $0 <cmd> [args]')
    .command(scaffoldCommand)
    .command(liftCommand)
    .command(extendEslintConfigCommand)
    .demandCommand(1, 'You need at least one command before moving on')
    .help('h')
    .alias('h', 'help')
    .argv;
}
