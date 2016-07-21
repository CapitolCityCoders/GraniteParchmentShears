import React from 'react'
import { Link } from 'react-router'
import * as Menu from '../models/menu'
//--------------------Game Over Page-------------//
export default class End extends React.Component{

  componentDidMount() {

    var winner = this.props.winner;
    var userId = this.props.userId;
    // console.log("showing user id in end.js:", this.props);
    Menu.updateGameStatus(this.props.gameId, 'completed')
      .then(function(data) {
        console.log("updated status to complete!:", data);
        Menu.updateUserRecord(userId, winner)
          .then(function(data) {

          })
      })
  }

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
