import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import App from './App/index';
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducer';
import config from './config';
import thunk from 'redux-thunk';

import './assets/scss/style.scss';
// ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'

const store = createStore(reducer,applyMiddleware(thunk));

const app = (
    <Provider store={store}>
        <BrowserRouter basename={config.basename}>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
