import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import 'babel-polyfill';
import 'animate.css';
import 'jquery';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min';
import 'react-datetime/css/react-datetime.css';
import './style/index.scss';

import Root from './Root';

const ELEMENT_TO_BOOTSTRAP = 'root';
const BootstrapedElement = document.getElementById(ELEMENT_TO_BOOTSTRAP);

const renderApp = (RootComponent) => {
  render(
    <AppContainer>
      <RootComponent />
    </AppContainer>,
    BootstrapedElement,
  );
};

renderApp(Root);

if (module.hot) {
  module.hot.accept(
    './Root',
    () => {
      renderApp(Root);
    },
  );
}
