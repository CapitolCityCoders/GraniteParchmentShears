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
          <Link to="/create" activeClassName="active"><button>New Game</button></Link>
          <Link to="/join" activeClassName="active"><button>Join Game</button></Link>
      </div>
    );
  }
}
