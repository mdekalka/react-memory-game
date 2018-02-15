import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './utils/canvas';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
