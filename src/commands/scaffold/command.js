import {scaffold} from '@travi/project-scaffolder';
import {defineDecisions, defineScaffoldOptions} from '../../common/options';

export function handler(providedDecisions) {
  return scaffold(defineScaffoldOptions(defineDecisions(providedDecisions)));
}

export const command = 'scaffold';
export const describe = 'Scaffold a new project';
