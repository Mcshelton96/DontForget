import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import ApplicationViews from "./components/ApplicationViews";
import { LetterProvider } from "./providers/LetterProvider";



function App() {
  return (
    <div className="App">
      <Router>
        <LetterProvider>
          <ApplicationViews />
        </LetterProvider>
      </Router>
    </div>
  );
}

export default App;


