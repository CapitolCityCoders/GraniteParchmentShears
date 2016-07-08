// React and React packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

// Import components
import Menu from './components/Menu';
<<<<<<< 9ad761f52228bd36a1d98834800c9f419dfeebab
import BattleContainer from './components/BattleContainer';
=======
>>>>>>> Battle Container is now a class with view and constructor

// Render that component to the DOM!
ReactDOM.render((
  <Router history={browserHistory}>
<<<<<<< 9ad761f52228bd36a1d98834800c9f419dfeebab
    <Route path="/" component={Menu} />
    <Route path="/battle" component={BattleContainer} />

  </Router>
), document.getElementById('app'))
