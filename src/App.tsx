import React from "react";
import SearchApp from "./components/SearchApp/SearchApp";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>The Rick and Morty API</h1>
        <SearchApp />
      </div>
    );
  }
}

export default App;
