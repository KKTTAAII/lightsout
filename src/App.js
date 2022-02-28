import React from "react";
import Board from "./Board";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <div className="App-header">Lights Out</div>
      <Board nrows={4} ncols={4} chanceLightStartsOn={0.5}/>
    </div>
  );
}

export default App;
