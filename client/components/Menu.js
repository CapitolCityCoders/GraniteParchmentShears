import React from 'react'
import { Link } from 'react-router'

export default class Menu extends React.Component{
  constructor(){
    super();
  }

  render() {
    return (
      <div>
        <h1>The Rock Shop</h1>
        <ul role="nav">
          <li><Link to="/create" activeClassName="active">New Game</Link></li>
          <li><Link to="/join" activeClassName="active">Join Game</Link></li>
        </ul>
      </div>
    );
  }
}
