import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default class App extends Component {


  apiKey=process.env.REACT_APP_NEWS_API

  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <Switch>
          <Route exact path="/"><News apiKey={this.apiKey} key="entertainment" pageSize={10} country="in" category="entertainment" /></Route>
          <Route exact path="/business"><News apiKey={this.apiKey} key="business" pageSize={10} country="in" category="business" /></Route>
          <Route exact path="/entertainment"><News apiKey={this.apiKey} key="entertainment" pageSize={10} country="in" category="entertainment" /></Route>
          <Route exact path="/general"><News apiKey={this.apiKey} key="general" pageSize={10} country="in" category="general" /></Route>
          <Route exact path="/health"><News apiKey={this.apiKey} key="health" pageSize={10} country="in" category="health" /></Route>
          <Route exact path="/science"><News apiKey={this.apiKey} key="science" pageSize={10} country="in" category="science" /></Route>
          <Route exact path="/sports"><News apiKey={this.apiKey} key="sports" pageSize={10} country="in" category="sports" /></Route>
          <Route exact path="/technology"><News apiKey={this.apiKey} key="technology" pageSize={10} country="in" category="technology" /></Route>
          
        </Switch>
        </Router>
      </div>
    )
  }
}

