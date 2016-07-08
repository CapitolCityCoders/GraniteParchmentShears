// React and React packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

// Import components
import Menu from './components/Menu';
import Create from './components/Create';
import Join from './components/Join';

// Render that component to the DOM!
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Menu} />
    <Route path="/create" component={Create} />
    <Route path="/join" component={Join} />
  </Router>
), document.getElementById('app'))
