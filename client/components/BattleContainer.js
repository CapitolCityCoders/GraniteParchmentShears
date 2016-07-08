var React = require('react');
var path = require('path');

var rockPath = path + __dirname + "/../public/images/rock.png"

function BattleContainer(props){
	return (

		<div>

			<div className="title container">
				<div>
					<h2>Rock Paper Scissors</h2>
				</div>
			</div>

			<div className="game container">

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
							"The Action Zone"
						</div>
						<div>
							<button>Rock</button>
							<button>Paper</button>
							<button>Scissors</button>
						</div>
					</div>

					<div className="playerTwo six columns">
						<div>
							<h5>Player Two Nickname</h5>
						</div>
						<div className="arena container">
							"The Action Zone"
						</div>
						<div>
							<button>Rock</button>
							<button>Paper</button>
							<button>Scissors</button>
						</div>
					</div>

				</div>
			</div>

			<div className="footer">

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

	)
}

module.exports = BattleContainer;