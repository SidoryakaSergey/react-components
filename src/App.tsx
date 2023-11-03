import React from 'react';
import { Header } from './components/Header/Header';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>The Rick and Morty API</h1>
        <Header />
      </div>
    );
  }
}

export default App;
