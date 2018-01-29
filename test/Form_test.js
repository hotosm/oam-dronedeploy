import test from 'tape';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Form from '../src/components/Form';
import { succeeded, none } from '../src/constants/exportStatus';

configure({
  adapter: new Adapter()
});

const setup = () => {
  const exportImage = () => {};
  const wrapper =
    shallow(<Form exportImage={exportImage} exportStatus={none} />);
  return wrapper;
};

test('Export button is disabled until Title and Provider are entered', (t) => {
  const wrapper = setup();
  t.true(wrapper.find('button').first().prop('disabled'));
  wrapper.setState({ title: 'title', provider: 'provider' });
  t.false(wrapper.find('button').first().prop('disabled'));
  t.end();
});

test('Succesful export resets form', (t) => {
  const wrapper = setup();
  const filledState = { title: 'title', provider: 'provider', tags: 'tags' };
  wrapper.setState(filledState);
  t.equal(wrapper.state('title'), filledState.title);
  t.equal(wrapper.state('provider'), filledState.provider);
  t.equal(wrapper.state('tags'), filledState.tags);
  wrapper.setProps({ exportStatus: succeeded });
  t.equal(wrapper.state('title'), '');
  t.equal(wrapper.state('provider'), '');
  t.equal(wrapper.state('tags'), '');
  t.end();
});
