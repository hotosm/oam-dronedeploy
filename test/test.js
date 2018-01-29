/* global window setTimeout */
/* eslint-disable no-unused-vars */
import test from 'tape';
import ContainerTest from './Container_test';
import authTest from './auth_test';
import exporterMiddlewareTest from './exporterMiddleware_test';
import FormTest from './Form_test';

test('Shutdown', (t) => {
  t.pass('Shutting down');
  t.end();
  setTimeout(() => {
    window.close();
  });
});
