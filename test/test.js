/* global window setTimeout */
/* eslint-disable no-unused-vars */
import test from 'tape';
import ContainerTest from './Container_test';

test('Shutdown', (t) => {
  t.pass('Shutting down');
  t.end();
  setTimeout(() => {
    window.close();
  });
});
