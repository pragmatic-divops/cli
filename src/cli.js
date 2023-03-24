import 'source-map-support/register';
import * as scaffoldCommand from './commands/scaffold';
import * as liftCommand from './commands/lift/index.js';
import * as extendEslintConfigCommand from './commands/extend-eslint-config';

export default function (yargs) {
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
