import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import ApplicationViews from "./components/ApplicationViews";
import { LetterProvider } from "./providers/LetterProvider";
import Header from "./components/Header";


function App() {
  return (
    <div className="App">
      <Router>
        <LetterProvider>
          <Header/>
          <ApplicationViews />
        </LetterProvider>
      </Router>
    </div>
  );
}

export default App;


