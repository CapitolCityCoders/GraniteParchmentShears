import React from 'react'

export default class About extends React.Component{
  render() {
    return (
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
    );
  }
}
