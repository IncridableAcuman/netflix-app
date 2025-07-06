import {BrowserRouter} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'
import MovieProvider from './contexts/MovieProvider.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
    <MovieProvider>
      <App />
    </MovieProvider>
  </AuthProvider>
  </BrowserRouter>
)
