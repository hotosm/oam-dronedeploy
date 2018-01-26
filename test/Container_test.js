import test from 'tape';
import React from 'react';
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
  const checkTokenStatus = () => {};
  const setDronedeployAPI = () => {};
  const props = {
    checkTokenStatus,
    exportImage,
    setDronedeployAPI,
    isAuthenticated
  };
  const wrapper = shallow(<Container {...props} />);
  return wrapper;
};

test('shallow', (t) => {
  const wrapper = setup(false);
  t.ok(wrapper.contains(<Facebook />));
  t.notOk(wrapper.contains(<Form exportImage={() => {}} />));
  t.end();
});
