import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import './index.scss';

ReactDOM.render(

  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
  ,
  document.getElementById('root')
);


