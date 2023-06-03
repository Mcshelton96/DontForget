import React from "react";
import "./App.css";
import { LetterProvider } from "./providers/LetterProvider";
import LetterList from "./components/LetterList";

function App() {
  return (
    <div className="App">
      <LetterProvider>
        <LetterList />
      </LetterProvider>
    </div>
  );
}

export default App;