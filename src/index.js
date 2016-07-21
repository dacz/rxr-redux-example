import 'babel-polyfill'; // eslint-disable-line

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'rxr-react';
import { createState } from 'rxr';

import styles from './index.css'; // eslint-disable-line

import App from './components/App';

import reducer$ from './reducers';

const initialState = {
  clients:        { data: [], ts: 0, status: undefined },
  filter:         '',
  selectedClient: '',
};

const state$ = createState(reducer$, initialState);

render(
  <Provider state$={ state$ }>
    <App />
  </Provider>, document.getElementById('index')
);
