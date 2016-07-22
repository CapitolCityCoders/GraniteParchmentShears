import React from 'react';
import ReactD3 from 'react-d3-components';
import * as db from '../models/menu';

export default class PieChart extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      waiting: 0,
      finished: 0
    }
    this.generatePieChart();
  }
  
  generatePieChart() {
    db.gameList()
      .then(gameList => {
        const waiting = gameList.filter(game => {
          return game.status === 'waiting'
        }).length;
        const finished = gameList.length - waiting;
        this.setState({ waiting, finished });
      })
      console.log(this.state.waiting, this.state.finished)
  }

  render() {
    console.log("piechart.js got run");
    var PieChart = ReactD3.PieChart;

    var data = {
        label: 'somethingA',
        values: [{x: 'waiting', y: this.state.waiting}, {x: 'finished', y: this.state.finished}]
    };

    var sort = null;

    return (
      <div>
        <PieChart
               data={data}
               width={400}
               height={200}
               margin={{top: 5, bottom: 5, left: 20, right: 10}}
               sort={sort}/>
      </div>
        
    )
  }
}


