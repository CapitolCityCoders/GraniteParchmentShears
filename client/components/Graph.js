import React from 'react';
import ReactD3 from 'react-d3-components';
import * as db from '../models/menu';

export default class Graph extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userScores: [], // [{uu1:4},{uu2:2}]
      chartValues: [{x: 'user1', y: 4}, {x: 'user2', y: 2}, {x: 'user3', y: 1}]
    }   
  }

  componentDidMount() {
    this.getUniqueUsers();
  }

  getUniqueUsers() {
    //get all users
    db.playerList()
      .then(players => {
          const users = players.map(player => player.name).filter((name,index,self) => self.indexOf(name) === index)
            this.updateUserScoresState(users);
        })
  }

  updateUserScoresState(users) {
    users.forEach(user => {
      db.gamesByUsername(user)
        .then(gameList => {
          const scores = gameList.map(game => game.score)
          const total = scores.reduce((sum,score) => {
            return sum += score;
          },0);
          
          this.setState({userScores: this.state.userScores.concat({[user]:total})});
            //console.log('state is ~~', JSON.stringify(this.state.userScores));
             this.generateLeaderBoard();
        })
       
    })  
    
  }

  generateLeaderBoard() {
    const values = this.state.userScores.map(userScore => {
      const key = Object.keys(userScore)[0];
      return {x: key, y: userScore[key]}
    })
    //console.log(values)
    this.setState({chartValues: values})
  }
 
  render() {
   
    var BarChart = ReactD3.BarChart;

    var data = [{
        label: 'Leaderboard',
        values: this.state.chartValues
    }];

    return (
      <div>
      <h3>Leaderboard</h3>
        <BarChart
               data={data}
               width={400}
               height={200}
               margin={{top: 5, bottom: 40, left: 40, right: 20}}/>
      </div>
        
    )
  }
}