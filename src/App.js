import React, { Component } from 'react';
import './App.css';
import HeatMap from './HeatMap';
class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <HeatMap />
        </div>
      </div>
    );
  }
}
export default App;
