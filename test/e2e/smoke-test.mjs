import {execa} from 'execa';
import packageDetails from '../../package.json' with {type: 'json'};

await execa(packageDetails.bin['pragmatic-divops'], ['--help']);
