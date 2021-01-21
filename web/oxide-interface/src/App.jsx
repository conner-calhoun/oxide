import React from 'react';

import './App.css';
import Header from './components/Header/Header';
import PowerControl from './components/PowerControl/PowerControl';

class App extends React.Component {
  render() {
    return (
      <div className="App" >
        <Header title="Oxide Interface" />
        <PowerControl />
      </div>
    );
  }
}

export default App;
