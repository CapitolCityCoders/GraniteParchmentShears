# Granite Parchment Shears

A two player game of Rock-Paper-Scissors. [Granite Parchment Shears](http://granite-parchment-shears.herokuapp.com/)

Created with: React, React Router, SocketIO, Express, PostgreSQL w/ KNEX, Browserify, Skeleton.css


Uses a Menu component that routes to Game component based on access code.
-See /client/main.js

### Components
  * Menu
  	* Create
  	* Join
  * Game
    * Lobby
    * BattleContainer
      * Player
      * Opponent
      * Scoreboard
      * Banner
    * End

### Creating/Joining Game:
 * Player 1 creates a game, is given a unique access code
 * Player 1 sends the access code to player 2 outside of the game, e.g., text or email
 * To join Player 1's game, Player 2 enters the unique access code sent from Player 1


### Battle Logic:
 * Game is played as 'best 2 out of 3'
 * If players tie, gameplay will continue in current round


### Future Features:
 * Spectators / more than 2 players in room
 * Rematch functionality
 * Player Stats
 * Implement Gulp
 * Edit Name button functionality


### Outstanding Bugs:
 * When refreshed inGame, goes to Lobby
 * Sockets left open for every game
 


### Authors: 
* [Amanda Fillip](https://github.com/afillip)
* [Mike Fleming](https://github.com/mikemfleming)
* [Tom LeConey](https://github.com/theTSLC)
* [Shane McQuerter](https://github.com/Shanetou)
* [Kenny Torng](https://github.com/ktorng)
