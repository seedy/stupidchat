import React, { Component } from 'react';

import './App.css';
import MainContainer from "./core/chat/main.container";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainContainer/>
      </div>
    );
  }
}

export default App;
