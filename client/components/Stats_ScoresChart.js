import React from 'react';
import _ from 'underscore';
import ReactD3 from 'react-d3-components';
import * as db from '../models/menu';

export default class ScoresChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userScores: [], // [{uu1:4},{uu2:2}]
      pieChartValues: [{x: 'user1', y: 0}, {x: 'user2', y: 0}, {x: 'user3', y: 0}]
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
          const users = players.map(player => player.name).filter((name,index,self) => self.indexOf(name) === index)
            this.updateUserScoresState(users);
        })
  }

  GetTop5Users(players){
    const sortedPlayers = _.sortBy(players,'wins')
    const noZeroPlayers = _.reject(sortedPlayers,player => player.wins == 0)
    const top5Players = _.first(noZeroPlayers, 5) 
    //console.log(top5Players);
    return top5Players;
  }

  updateUserScoresState(users) {
    users.forEach(user => {
      db.gamesByUsername(user)
        .then(gameList => {
          const wins = gameList.map(game => game.wins)
          const total = wins.reduce((sum,win) => {
            return sum += win;
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
    this.setState({pieChartValues: values})
  }

  tooltipPieChart(x,y) {
    //console.log(x,y)
    return y.toString();
  }

  render() {
    console.log("stats_scores.js got run")
    const PieChart = ReactD3.PieChart;
    const data = {
        label: 'Leaderboard',
        values: this.state.pieChartValues
    };

    return (
        <div className="col-xs-12 text-center">
          <h3>Top Users and Their Wins</h3>
            <PieChart
                   data={data}
                   width={600}
                   height={400}
                   margin={{top: 30, bottom: 10, left: 100, right: 100}}                
                   tooltipHtml={this.tooltipPieChart}
                   tooltipMode={'fixed'}
                   tooltipOffset={{top: 135, left: 200}}
                 />
        </div>

    )
  }
}
