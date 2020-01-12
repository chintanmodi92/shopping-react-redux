import React from 'react'
import Navbar from './components/UI/Navbar'
import Home from './components/pages/Home'
import Cart from './components/pages/Cart'
import Checkout from './components/pages/Checkout'
import Confirmation from './components/pages/Confirmation'

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Router>
        <Route path='/' component={Navbar} />
        <Route path='/' exact component={Home} />
        <Route path='/cart' component={Cart} />
        <Route path='/checkout' component={Checkout} />
        <Route path='/confirmation' component={Confirmation} />
      </Router>
    </div>
  )
}

export default App
