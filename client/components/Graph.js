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
    console.log('after~')
  }

  getUniqueUsers() {
    //get all users
    db.playerList()
      .then(players => {
          const users = players.map(player => player.name).filter((name,index,self) => self.indexOf(name) === index)
            //console.log(users)
            this.updateUserScoresState(users);
        })
  }

  updateUserScoresState(users) {
    console.log('users~~~',users)
    users.forEach(user => {
      db.gamesByUsername(user)
        .then(gameList => {
          const scoreArr = gameList.map(game => game.score)
          const total = scoreArr.reduce((sum,score) => {
            //console.log('sum~~~',sum)
            return sum += score;
          },0);
          //console.log(total)
          
          this.setState({userScores: this.state.userScores.concat({[user]:total})});
            console.log('state is ~~', JSON.stringify(this.state.userScores));
             this.generateLeaderBoard();
        })
       
    })  
    
  }

  generateLeaderBoard() {
    const values = this.state.userScores.map(userScore => {
      const key = Object.keys(userScore)[0];
      return {x: key, y: userScore[key]}
    })
    console.log(values)
    this.setState({chartValues: values})
  }
  //[{"uu1":4},{"uu2":1}]


  render() {
   
    var BarChart = ReactD3.BarChart;

    var data = [{
        label: 'Leaderboard',
        values: this.state.chartValues
        //values: [{x: 'user1', y: 4}, {x: 'user2', y: 2}, {x: 'user3', y: 1}]
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



