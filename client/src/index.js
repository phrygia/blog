import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import theme from './assets/style/theme'
import './assets/css/common.scss'
import { ThemeProvider } from 'styled-components'
import LoadUser from './components/auth/LoadUser'

LoadUser()

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)
