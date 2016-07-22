import React from 'react';
import _ from 'underscore';
import ReactD3 from 'react-d3-components';
import * as db from '../models/menu';
import * as Game from '../models/game';
import Opponent from './Stats_Opponent';


export default class OpponenetList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      opponents: []
    };
    //this.getOpponents(1);
  }

  // getOpponents(userId){

  //   return Game.getOpponentByPlayerId(userId, this.gameId)
  //     .then(data => {
  //       this.setState({opponent: data[0]});
  //       return;
  //     });
  // }
  getNumberOfGames(){
    return db.gameList()
      .then(gameList => {
        console.log('222~~~',gameList.length)
        return gameList.length;
        })
  }

 getOpponents(userId) {

    this.getNumberOfGames()
      .then(gamesCount => {
        console.log('gamesCount~~~~', gamesCount)
        return gamesCount
        })
      .then(gamesCount =>{
        while(gamesCount > 0) {
          Game.getOpponentByPlayerId(userId, gamesCount)
            .then(data => {
              this.setState({opponents: this.state.opponents.concat(data[0])});
            });
            gamesCount--;
        }
        console.log('4~~~~',this.state.opponents)
      })

    
  }

// generatePieChart() {
//     db.gameList()
//       .then(gameList => {
//         const waiting = gameList.filter(game => {
//           return game.status === 'waiting'
//         }).length;
//         const finished = gameList.length - waiting;
//         this.setState({ waiting, finished });
//       })
//       console.log(this.state.waiting, this.state.finished)
//   }
  render() {
    
    return (
        // const opponents = this.state.opponents.map((opponent) => {
        //         return (
        //           <Opponent />
        //         )
        //     })
      <div>

           

      </div>
    )
  }
}