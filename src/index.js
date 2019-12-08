import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducer } from "./components/store/reducer/reducer";
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

const store = createStore(reducer);
const app = (
    <Provider store={store}>
        <App />
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
