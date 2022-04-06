import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import setupSinon from 'ember-sinon-qunit';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';

import Application from '../app';
import config from '../config/environment';
import { setupGlobalReactHooks } from 'ember-react-components/test-support';

setup(QUnit.assert);

setApplication(Application.create(config.APP));

setupSinon();

setupGlobalReactHooks();

start();
