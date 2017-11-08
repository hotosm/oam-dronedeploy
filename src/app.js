/* global document */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Container from './components/Container';

const store = configureStore();
render(
  <AppContainer>
    <Provider store={store}>
      <Container />
    </Provider>
  </AppContainer>,
  document.getElementById('app')
);
