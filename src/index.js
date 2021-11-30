import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={process.env.REACT_APP_SECRET} serverUrl={process.env.REACT_APP_SERVER_URL}>
     <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);