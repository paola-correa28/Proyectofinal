import React from 'react'
import ReactDOM from 'react-dom/client'
import Titulo from './Titulo.jsx'
import App from './App.jsx'
import Factura from './Factura.jsx'
import Producto from './Producto.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Titulo />
    <App />
    <Factura/>
    <Producto/>
  </React.StrictMode>
)
