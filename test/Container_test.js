/* global window */
/* eslint-disable func-names */
import test from 'tape';
import React from 'react';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Container } from '../src/components/Container';
import Facebook from '../src/components/Facebook';
import Form from '../src/components/Form';

configure({
  adapter: new Adapter(),
  disableLifecycleMethods: true
});

const setup = (isAuthenticated) => {
  const exportImage = () => {};
  const checkTokenStatus = sinon.spy();
  const setDronedeployAPI = sinon.spy();
  const props = {
    checkTokenStatus,
    exportImage,
    setDronedeployAPI,
    isAuthenticated
  };
  const wrapper = shallow(<Container {...props} />);
  return { wrapper, checkTokenStatus, setDronedeployAPI };
};

test('Container renders login when the user is not authenticated', (t) => {
  const { wrapper } = setup(false);
  t.equals(wrapper.find(Facebook).length, 1);
  t.equals(wrapper.find(Form).length, 0);
  t.end();
});

test('Container renders the Form when the user is authenticated', (t) => {
  const { wrapper } = setup(true);
  t.equals(wrapper.find(Form).length, 1);
  t.equals(wrapper.find(Facebook).length, 0);
  t.end();
});

test('Container componentDidMount runs necessary setup', (t) => {
  const api = 'api';
  let dronedeploy;
  // DroneDeploy constructor
  window.DroneDeploy = function () {
    dronedeploy = Promise.resolve(api);
    return dronedeploy;
  };
  configure({
    adapter: new Adapter(),
    disableLifecycleMethods: false
  });
  const { checkTokenStatus, setDronedeployAPI } = setup(true);
  t.equal(checkTokenStatus.callCount, 1);
  dronedeploy.then(() => {
    t.ok(setDronedeployAPI.calledWith(api));
    t.end();
  });
});
