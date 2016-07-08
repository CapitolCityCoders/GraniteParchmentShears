import React from 'react'
import { Link } from 'react-router'

export default class Menu extends React.Component{
  constructor(){
    super();
  }

  // render links to Create and Join components
  render() {
    return (
      <div className="main-menu">
        <h1>The Rock Shop</h1>
        <div className="button-container">
          <Link to="/create"><button>New Game</button></Link>
          <Link to="/join"><button>Join Game</button></Link>
        </div>
      </div>
    );
  }
}
