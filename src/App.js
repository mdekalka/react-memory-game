import React, { Component } from 'react';

import GameShell from './components/GameShell/GameShell';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <GameShell />
      </div>
    );
  }
}

export default App;
