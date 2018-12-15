import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AppRouter from './AppRouter'
import { addBackToTop } from 'vanilla-back-to-top'

import './App.css';

addBackToTop({
  diameter: 45,
  backgroundColor: '#00d89e',
  textColor: '#fff',
  scrollDuration: '320',
  showWhenScrollTopIs: '320'
})

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }
  
  render() {
    return (
      <div>
        <AppRouter/>
        <div className="footer">
          <img src="https://www.themoviedb.org/assets/1/v4/logos/powered-by-square-blue-30582ce92620a08ce2ab8082fb19897a3c69093aa20e786cfe6a041e54e21b2b.svg" alt="the Movie DB logo"/>
        </div>
      </div>
    );
  }

}

export default App;
