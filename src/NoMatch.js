import React, { Component } from 'react';

import './App.css';

class NoMatch extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="row sectioncont wronginfo">
        <div className="col-12">
          <h1 className="sectionhead sectionhead2">Whoopsies! Something went wrong.</h1>
          <div className="imagewrap">
            <img src="https://placekitten.com/700/820" alt="nothing to see here, kitty"/>
          </div>
        </div>
      </div>
    );
  }

}

export default NoMatch;
