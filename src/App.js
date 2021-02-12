import './App.css'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { Component } from 'react'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Nav from './Pages/Nav'
import Error from './Pages/Error'
import Dashboard from './Pages/Dashboard'

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/dashboard' component={Dashboard} />
            <Route component={Error} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
