import "./index.css";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { CarritoProvider } from './context/CarritoContext'
import { AuthProvider } from "./context/AuthContext"
import { ProductosProvider } from "./context/ProductosContext" 

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ProductosProvider> 
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </ProductosProvider> 
    </AuthProvider>
  </BrowserRouter>
)