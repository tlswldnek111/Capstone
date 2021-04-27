import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Navi from './component/Navi';

ReactDOM.render(
  <BrowserRouter>
    <Navi />
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();