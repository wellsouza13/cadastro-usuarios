
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '../src/scss/styles.scss'
import '../src/scss/loadingSpinner.scss'
import { makeServer } from './server';

if (import.meta.env.VITE_NODE_ENV === 'development') {
  makeServer();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
