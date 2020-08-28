import 'source-map-support/register';
import * as scaffoldCommand from './commands/scaffold';

export default function (yargs) {
  return yargs
    .scriptName('pragmatic-divops')
    .usage('Usage: $0 <cmd> [args]')
    .command(scaffoldCommand)
    .demandCommand(1, 'You need at least one command before moving on')
    .help('h')
    .alias('h', 'help')
    .argv;
}
