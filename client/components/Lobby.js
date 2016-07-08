import React from 'react'
import { Link } from 'react-router'

export default class Lobby extends React.Component{
  constructor(){
    super();
  }

  render() {
    return (
      <section className="container six columns offset-by-three">
        <h4>Waiting for opponent...</h4>

        <div className="access-code">
          Access Code: 
          <span> {this.props.params.accessCode} </span>
        </div>

        <hr />

        <ol className="lobby-player-list">
          <li>
            player placeholder

            {/* add if current player logic */}
            <a href="#" className="btn-edit-player">
              <i className="fa fa-pencil"></i>
            </a>

            {/* add if not current player logic
            <a href="#" className="btn-remove-player">
              <i className="fa fa-close"></i>
            </a>
            */}

          </li>

        </ol>

        <hr />

        <div className="button-container">
          <button>Start Game</button>
          <Link to="/"><button>Leave Game</button></Link>
        </div>

      </section>
    );
  }
}
