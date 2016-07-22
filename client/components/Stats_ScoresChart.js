import React from 'react';
import _ from 'underscore';
import ReactD3 from 'react-d3-components';
import * as db from '../models/menu';

export default class ScoresChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userScores: [], // [{uu1:4},{uu2:2}]
        barChartValues: [
      {
      label: 'somethingA',
            values: [
                {x: 'SomethingA', y: 10}, //{x: user1.name, y: user1.wins}
                {x: 'SomethingC', y: 3}//{x: user2.name, y: user2.wins}
            ]
      },
      {
      label: 'somethingB',
            values: [
                {x: 'SomethingA', y: 6},//{x: user1.name, y: user1.losses}
                {x: 'SomethingC', y: 5}//{x: user2.name, y: user2.losses}
            ]
      }   
      ]
    }

    // this.structureData();
  }

 
  componentDidMount() {
    
    console.log("in component did mount")
    this.structureData();
  }

  structureData() {
    var pureData = [];
    db.playerList()
      .then((players) => {
        console.log("showing user data:", players);
        players.forEach(function(player) {
          pureData.push({name: player.name, wins: player.wins, losses: player.losses})
        })

        var sortedFilteredPlayers = _.sortBy(pureData,'wins').reverse().filter(function(el) {return el.wins > el.losses;});
        
        if(sortedFilteredPlayers.length > 5) {
          sortedFilteredPlayers = sortedFilteredPlayers.slice(0,5);
        }

        console.log("showing after sorted:", sortedFilteredPlayers);

        var barChartData = [{label: 'wins', values:[]}, {label: 'losses', values: []}];

        sortedFilteredPlayers.forEach(function(player) {
          barChartData[0].values.push({x: player.name, y: player.wins})
          barChartData[1].values.push({x: player.name, y: player.losses})
        })
        console.log("showing barChartData:", barChartData);
        this.setState({barChartValues: barChartData});
      })
  }

  

  

  tooltipStacked(x, y0, y, total) {
    //console.log('3~~~~',x,y0,y,total)
    return y.toString();
  }

  render() {
    // this.structureData();
    console.log("stats_scores.js got run")
    const BarChart = ReactD3.BarChart;
    const data = this.state.barChartValues
    console.log("Showing data before graph creation:", data);

    return (
        <div className="col-xs-12 text-center">
          <h3>Top Users and Their Wins</h3>

          <BarChart
                   data={data}
                   width={600}
                   height={400}
                   margin={{top: 30, bottom: 30, left: 100, right: 100}}                
                   tooltipHtml={this.tooltipStacked}
                   tooltipMode={'element'}
                   tooltipOffset={{top: 0, left: 0}}
                 />
            
        </div>

    )
  }
}








