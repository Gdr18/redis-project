import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from './pages/home'
import NoMatch from './pages/no-match';
import Navigation from './navigation';
import Urls from './pages/urls';
import DisplayUrl from './pages/display-url';

export default class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className='app'>
        <Router>
          <Navigation />
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/urls" component={Urls} />
              <Route exact path="/url/:slug" component={DisplayUrl} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
