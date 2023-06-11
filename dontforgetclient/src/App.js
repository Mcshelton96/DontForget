import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import ApplicationViews from "./components/ApplicationViews";
import { LetterProvider } from "./providers/LetterProvider";
import { ContactProvider } from "./providers/ContactProvider";
import Header from "./components/Header";


function App() {
  return (
    <div className="App">
      <Router>
        <LetterProvider>
          <ContactProvider>
            <Header />
            <ApplicationViews />
          </ContactProvider>
        </LetterProvider>
      </Router>
    </div>
  );
}

export default App;


