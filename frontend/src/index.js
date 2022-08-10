import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import ScrollToTop from './helper/ScrollToTop';

import {Provider} from "react-redux";
import {configureStore as createStore} from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
import mainReducer from "./redux/reducers/mainReducer";

const reduxStore = createStore({reducer: mainReducer})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={reduxStore}>
    <React.StrictMode>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);