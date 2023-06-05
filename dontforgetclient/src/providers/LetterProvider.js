import React, { useState } from "react";

export const LetterContext = React.createContext();

export const LetterProvider = (props) => {
    const [letters, setLetters] = useState([]);

    const GetAllLetters = () => {
        return fetch("/api/letter")
        .then((res) => res.json())
        .then(setLetters);
    };

    const addLetter = (letter) => {
        return fetch("/api/letter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(letter),
        });
      };

      return (
        <LetterContext.Provider value={{ letters, GetAllLetters, addLetter }}>
          {props.children}
        </LetterContext.Provider>
      );
}