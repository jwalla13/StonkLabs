import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import React, { Component } from "react";
import Dashboard from './Dashboard'

class App extends Component {
  render() {
    return (
        <Router>
          <Route path="/" component={Dashboard} />
        </Router>
      );
  }
}

export default App;
