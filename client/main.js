// React and React packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

// Import components
import Menu from './components/Menu';
import Game from './components/Game';
import BattleContainer from './components/BattleContainer';

// Render that component to the DOM!
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Menu} />
    <Route path="/battle" component={BattleContainer} />
    <Route path="/:accessCode" component={Game} />
  </Router>
), document.getElementById('app'))
