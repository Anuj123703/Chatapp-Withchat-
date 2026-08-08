import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider} from 'react-redux'
import { store } from './Redux/store.js'
export const API_URL = "http://localhost:7000"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store} >
    <App />
  </Provider>
  </BrowserRouter>
)
