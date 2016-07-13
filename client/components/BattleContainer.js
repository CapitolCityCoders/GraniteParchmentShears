import React from 'react'
var path = require('path');

import { Link } from 'react-router'
import * as Game from '../models/game'

export default class BattleContainer extends React.Component{
	constructor(){
		super();
		this.state = {
			icon1: '',
			icon2: '',
		}

	}

//-----------------------Player One Throw Handling-----------------//
//----------------------------------------------------------------//
	handleRockThrow1(e){
		e.preventDefault()
		this.setState({icon1: '/images/rock.png'})
		//update throw count
			// this.state.throw ++
		//check throw count
			// this.state.throw ? 
		// check if player 2 thrown
			// Game.check2Throw
		//send rock status (post) to database for player 1
		Game.player1Throw('rock')
	}

	handlePaperThrow1(e){
		e.preventDefault()
		this.setState({icon1: "/images/paper.png" })
		//send paper status to database for player 1
		Game.player1Throw('paper')
	}

	handleScissorThrow1(e){
		e.preventDefault()
		this.setState({icon1:"/images/scissors.png" })
		//send scissor status to database for player 1
		Game.player1Throw('scissors')
	}
//----------------------Player Two Throw Handling-----------------//
//---------------------------------------------------------------//
	handleRockThrow2(e){
		e.preventDefault()
		this.setState({icon2: "/images/rock.png"})
		//send rock status to database for player 2
		Game.player2Throw('rock')

	}
	handlePaperThrow2(e){
		e.preventDefault()
		this.setState({icon2: "/images/paper.png" })
		//send paper status to database for player 2
		Game.player2Throw('paper')
	}

	handleScissorThrow2(e){
		e.preventDefault()
		this.setState({icon2:"/images/scissors.png" })
		//send scissor status to database for player 2
		Game.player2Throw('scissors')

	}

//------------------------Render------------------------//
//------------------------------------------------------//
	render(){
		return(
			<div>

				<div className="rounds container">
					<div className="four columns">
						<div>Round One</div>
					</div>
					<div className="four columns">
						<div>Round Two</div>
					</div>
					<div className="four columns">
						<div>Round Three</div>
					</div>
				</div>

				<div className="status container">
					<div className="four columns offset-by-four columns">GAME INFO</div>
				</div>
				
				<div className="players container">
					<div className="playerOne six columns">
						<div>
							<h5>Player One Nickname</h5>
						</div>
						<div className="arena container">							
							<img src = {this.state.icon1}/>
						</div>
						<div>
							<button onClick={this.handleRockThrow1.bind(this)}>Rock</button>
							<button onClick={this.handlePaperThrow1.bind(this)}>Paper</button>
							<button onClick={this.handleScissorThrow1.bind(this)}>Scissors</button>
						</div>
					</div>

					<div className="playerTwo six columns">
						<div>
							<h5>Player Two Nickname</h5>
						</div>
						<div className="arena container">
							
							<img src = {this.state.icon2}/>
						</div>
						<div>
							<button onClick={this.handleRockThrow2.bind(this)}>Rock</button>
							<button onClick={this.handlePaperThrow2.bind(this)}>Paper</button>
							<button onClick={this.handleScissorThrow2.bind(this)}>Scissors</button>
						</div>
					</div>
				</div>

			<div className="about">

				<div className="title container">
					<div className="four columns offset-by-four columns">
						<div>ABOUT</div>
					</div>
				</div>

				<div className="devs container">
					<div className="two columns offset-by-one column">
						<div>
							<h6>Amanda's Headshot</h6>
						</div>
						<p>some other stuff</p>
					</div>
					<div className="two columns">
						<div>
							<h6>Kenny's Headshot</h6>
						</div>
						<p>some other stuff</p>
					</div>
					<div className="two columns">
						<div>
							<h6>Mike's Headshot</h6>
						</div>
						<p>some other stuff</p>
					</div>
					<div className="two columns">
						<div>
							<h6>Shane's Headshot</h6>
						</div>
						<p>some other stuff</p>
					</div>
					<div className="two columns">
						<div>
							<h6>Tom's Headshot</h6>
						</div>
						<p>some other stuff</p>
					</div>
				</div>

			</div>
		</div>
		);
	}
}


