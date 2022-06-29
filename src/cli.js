import {hideBin} from 'yargs/helpers';

import * as scaffoldCommand from './commands/scaffold/index.js';
import * as extendEslintConfigCommand from './commands/extend-eslint-config/index.js';

export default function (yargs) {
  return yargs(hideBin(process.argv))
    .scriptName('pragmatic-divops')
    .usage('Usage: $0 <cmd> [args]')
    .command(scaffoldCommand)
    .command(extendEslintConfigCommand)
    .demandCommand(1, 'You need at least one command before moving on')
    .help('h')
    .alias('h', 'help')
    .argv;
}
