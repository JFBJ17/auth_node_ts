import React from 'react'
import ReactDOM from 'react-dom'
import Context from './Pages/Context';
import App from './App'
import './main.css';

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <App />
    </Context>
  </React.StrictMode>,
  document.getElementById('root')
)
