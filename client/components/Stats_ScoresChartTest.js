import React from 'react';
import _ from 'underscore';
import ReactD3 from 'react-d3-components';
import * as db from '../models/menu';

export default class ScoresChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userScores: [], // [{uu1:4},{uu2:2}]
      winsValues: [{x: 'user1', y: 0}, {x: 'user2', y: 0}],
      lostsValues: [{x: 'user1', y: 0}, {x: 'user2', y: 0}]
    }
  }

  componentDidMount() {
    this.getUniqueUsers();
  }

  getUniqueUsers() {
    //get all users
    db.playerList()
      .then(players => {
          players = this.GetTop5Users(players);
          console.log('2~~~~~', JSON.stringify(players))
          const users = players.map(player => player.name).filter((name,index,self) => self.indexOf(name) === index)
          console.log('3~~~~~', users)
            this.updateUserScoresState(users);
        })
  }

  GetTop5Users(players){
     console.log('1~~~~~', JSON.stringify(players))
    const sortedPlayers = _.sortBy(players,'wins')
    const noZeroPlayers = _.reject(sortedPlayers,player => player.wins == 0)
    const top5Players = _.first(noZeroPlayers, 5) 
    //console.log(top5Players);
    return top5Players;
  }

  updateUserScoresState(users) {
    //["longnamename", "Yuan-Yuan Lu"]
    users.forEach(user => {
      db.gamesByUsername(user)
        .then(gameList => {
          const wins = gameList.map(game => game.wins)
           console.log('4~~~~~', wins)
          const totalWins = wins.reduce((sum,win) => {
            return sum += win;
          },0);
          console.log('5~~~~~', totalWins)
          const losses = gameList.map(game => game.losses)
          console.log('4~~~~~', losses)
          const totalLosses = losses.reduce((sum,loss) => {
            return sum += loss;
          },0);
          console.log('5~~~~~', totalLosses)
          console.log('06~~~~~', JSON.stringify(this.state.winsValues))
          console.log('07~~~~~', JSON.stringify(this.state.lostsValues))
          this.setState({winsValues: this.state.winsValues.concat({[user]:totalWins})});
          this.setState({lostsValues: this.state.lostsValues.concat({[user]:totalLosses})});

             this.generateLeaderBoard();
        })
    })
  }

  generateLeaderBoard() {
    const winValues = this.state.winsValues.map(userWin => {
      const key = Object.keys(userWin)[0];
      return {x: key.substring(0,15), y: userWin[key]}
    })
    const lostsValues = this.state.lostsValues.map(userLoss => {
      const key = Object.keys(userLoss)[0];
      return {x: key.substring(0,15), y: userLoss[key]}
    })
    console.log('6~~~~~', winValues)
    console.log('7~~~~~', lostsValues)

    this.setState({winsValues: winValues})
    this.setState({lostsValues: lostsValues})
    console.log('8~~~~', this.state.winsValues)
    console.log('9~~~~', this.state.lostsValues)

  }

  // tooltipStacked(x, y0, y, total) {
  //   //console.log('3~~~~',x,y0,y,total)
  //   return y.toString();
  // }

  render() {

    const BarChart = ReactD3.BarChart;
    // const data = {
    //     label: 'Leaderboard',
    //     values: this.state.pieChartValues
    // };

    const dataStacked = [
      {
      label: 'User1',
            values: this.state.winsValues //[{x: 'user1', y: 0}, {x: 'user2', y: 0}, {x: 'user3', y: 0}]
      },
      {
      label: 'User2',
            values: this.state.lostsValues
      }   
    ];
    console.log('10~~~~~~',JSON.stringify(dataStacked))
    //{"label":"User1","values":
    // [{"x":"user1","y":0,"y0":0},{"x":"user2","y":0,"y0":0},{"longnamename":1,"y0":0},{"Yuan-Yuan Lu":1}]},
    // {"label":"User2","values":
    // [{"x":"user1","y":0,"y0":0},{"x":"user2","y":0,"y0":0}]}

    console.log('this.state.winsValues~~~~', JSON.stringify(this.state.winsValues))

    return (
        <div className="col-xs-12 text-center">
          <h3>Top Users and Their Wins</h3>
            <BarChart
               data={dataStacked}
               width={600}
               height={400}
               margin={{top: 30, bottom: 30, left: 100, right: 100}}                
               tooltipMode={'element'}
               tooltipOffset={{top: 0, left: 0}}
             />
        </div>

    )
  }
}
