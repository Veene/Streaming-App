import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

const pOne = () => {
  return (
    <div>Page1</div>
  )
}
const pTwo = () => {
  return (
    <div>Page2</div>
  )
}

const App = () => {
  return (
    <div>
      App
      <BrowserRouter >
        <div>
          <Route path="/" exact component={pOne} />
          <Route path="/p2" component={pTwo} />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App