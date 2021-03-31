import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import TestTabs from './component/TestTabs';
import TestRoute from './component/TestRoute';
import Test from './component/Test';
import Testgrid from './component/Testgrid';

ReactDOM.render(
  <BrowserRouter>
    <TestRoute />
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();