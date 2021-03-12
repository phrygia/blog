import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './assets/style/theme'
import './assets/common.scss'
import { ThemeProvider } from 'styled-components'
import LoadUser from './components/auth/LoadUser';

LoadUser()

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
