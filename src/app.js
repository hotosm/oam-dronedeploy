/* global document */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Container from './components/Container';

render(
  <AppContainer>
    <Container />
  </AppContainer>,
  document.getElementById('app')
);
