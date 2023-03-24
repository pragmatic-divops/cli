import {execa} from 'execa';
import packageDetails from '../../package.json' assert {type: 'json'};

await execa(packageDetails.bin['pragmatic-divops'], ['--help']);
