import React from 'react'
import { Link } from 'react-router'
//--------------------Game Over Page-------------//
export default class End extends React.Component{
  render() {
    return (
      <section className="narrative container six columns offset-by-three">

        <hr />

        <h1>{this.props.winner} wins the game!</h1>

        <hr />

        <div className="button-container">
          <button className="btn btn-default" onClick={this.props.rematch}>Rematch</button>
          <Link to="/"><button className="btn btn-default">Leave Game</button></Link>
        </div>

      </section>
    );
  }
}
