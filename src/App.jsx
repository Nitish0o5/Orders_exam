import React from 'react'
import { OrderProvider } from './context/Ordercontext'

function App() {
  return (
    <OrderProvider>
      <div className="App">
      </div>
    </OrderProvider>
  )
}

export default App
