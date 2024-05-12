
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '../src/scss/styles.scss'
import '../src/scss/loadingSpinner.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
