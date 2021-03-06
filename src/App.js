import './App.css'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { Component } from 'react'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import Nav from './Components/Nav'
import Error from './Pages/Error'
import Dashboard from './Pages/Dashboard'

class App extends Component {

  state = {
    loggedIn: JSON.parse(localStorage.getItem('loggedIn') || 'false'),
    username: localStorage.getItem('username') || '',
    id : localStorage.getItem('id') || ''
  }

  handleLogin = character => {
    this.setState({
      loggedIn: true,
      username: character['username'],
      id: character['id']
    }, () => {
    const siteUrl = window.location.origin;
    const targetUrl = siteUrl + "/dashboard"
    window.location.href = targetUrl;
    localStorage.setItem('loggedIn', true)
    localStorage.setItem('username', character['username'])
    localStorage.setItem('id', character['id'])       
  })
  }

  handleLogout = () => {
    this.setState({
      loggedIn: false,
      username: '',
      id: ''
    }, () => {
      const siteUrl = window.location.origin;
      const targetUrl = siteUrl + "/login"
      window.location.href = targetUrl;
      localStorage.setItem('loggedIn', false)
      localStorage.setItem('username', '')
      localStorage.setItem('id', '')
    })
  }

  render () {
    return (
      <Router>
        <div>
          <Nav user={this.state} handleLogout={this.handleLogout}/>
          <Switch>
            <Route exact path='/' render={props => (
              <Home {...props} user={this.state} handleLogin={this.handleLogin} />
            )} />
            <Route 
              exact
              path='/login'
              render={props => (
                <Login {...props} handleLogin={this.handleLogin}/>
              )}
            />
            <Route 
              exact
              path='/signup' 
              render={props => (
                <Signup {...props} handleLogin={this.handleLogin} />
              )}
            />
            <Route 
              exact
              path='/dashboard' 
              render={props => (
                <Dashboard {...props} user={this.state}/>
              )}
            />
            <Route exact component={Error} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
