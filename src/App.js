import './App.css'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { Component } from 'react'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Nav from './Components/Nav'
import Error from './Pages/Error'
import Dashboard from './Pages/Dashboard'

class App extends Component {

  state = {
    loggedIn: JSON.parse(localStorage.getItem('loggedIn') || 'false'),
    username: localStorage.getItem('username') || ''
  }

  handleLogin = character => {
    this.setState({
      loggedIn: true,
      username: character['username']
    }, () => {
    localStorage.setItem('loggedIn', true)
    localStorage.setItem('username', character['username'])      
  })
  }

  handleLogout = () => {
    this.setState({
      loggedIn: false,
      username: ''
    }, () => {
      localStorage.setItem('loggedIn', false)
      localStorage.setItem('username', '')
    })
  }

  render () {
    return (
      <Router>
        <div>
          <Nav loggedIn={this.state.loggedIn} loggedUsername={this.state.username} handleLogout={this.handleLogout}/>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route 
              exact
              path='/login'
              render={props => (
                <Login {...props} handleLogin={this.handleLogin} />
              )}
            />
            <Route 
              exact
              path='/signup' 
              render={props => (
                <Signup {...props} handleLogin={this.handleLogin} />
              )}
            />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact component={Error} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
