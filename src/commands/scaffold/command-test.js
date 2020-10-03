import * as projectScaffolder from '@travi/project-scaffolder';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import * as commonOptions from '../../common/options';
import {command, describe, handler} from '.';

suite('scaffold command', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(projectScaffolder, 'scaffold');
    sandbox.stub(commonOptions, 'defineDecisions');
    sandbox.stub(commonOptions, 'defineScaffoldOptions');
  });

  teardown(() => sandbox.restore());

  test('that the scaffold command is defined', async () => {
    const scaffoldingResults = any.simpleObject();
    const providedDecisions = any.simpleObject();
    const decisions = any.simpleObject();
    const scaffoldeOptions = any.simpleObject();
    commonOptions.defineDecisions.withArgs(providedDecisions).returns(decisions);
    commonOptions.defineScaffoldOptions.withArgs(decisions).returns(scaffoldeOptions);
    projectScaffolder.scaffold.withArgs(scaffoldeOptions).resolves(scaffoldingResults);

    assert.equal(await handler(providedDecisions), scaffoldingResults);
    assert.equal(command, 'scaffold');
    assert.equal(describe, 'Scaffold a new project');
  });
});
