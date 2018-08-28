import React, { Component } from 'react';
import './App.css';
import Text from './Text';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Welcome</h2>
        </header>
        <Text />
      </div>
    );
  }
}

export default App;
