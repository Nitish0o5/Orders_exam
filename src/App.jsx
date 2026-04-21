import React from 'react'
import { OrderProvider } from './context/Ordercontext'
import AppRouter from './Router/Approuter'

function App() {
  return (
    <OrderProvider>
      <AppRouter />
    </OrderProvider>
  )
}

export default App
