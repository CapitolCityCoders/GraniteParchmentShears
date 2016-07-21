import React from 'react'
import Sidebar from './Sidebar'
import { Link } from 'react-router'
import Menu from './Menu'

import * as db from '../models/menu'

export default class App extends React.Component{
  constructor(){
    super();
    this.state = {
      accessCode: '',
      username: '',
      view: null, 
    };
  }

render() {
    return (
      <div className="app">
	      <div className="menu">
	      	<Menu />
	      </div>
	      {
          this.state.view !== 'loggedOut'
    			? <div className="sidebar-container">
	      		  <Sidebar />
	      	  </div>
      	  : console.log('no sidebar on this view')
		    }
      </div>
    );
  }
}