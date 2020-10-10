import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './views/app';

import store from 'store/create';

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
