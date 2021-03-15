import 'bootstrap/dist/css/bootstrap.css';
import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore, {history} from './store/storeConfig';
import { ConnectedRouter } from 'connected-react-router';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <Provider store={store}>
    <ConnectedRouter history={history}>
    <App />
    </ConnectedRouter>
    </Provider>
  </BrowserRouter>,
  rootElement);

registerServiceWorker();

