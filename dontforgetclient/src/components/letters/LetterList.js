import React, { useContext, useEffect } from "react";
import { LetterContext } from "../../providers/LetterProvider";
import Letter from "./Letter"


const LetterList = () => {
    const { letters, GetAllLetters } = useContext(LetterContext);

    useEffect(() => {
        GetAllLetters();
    }, []);

    return (
        <div className="container">
        <div className="row justify-content-center">
          <div className="cards-column">
            {letters.map((letter) => (
              <Letter key={letter.id} letter={letter} />
            ))}
          </div>
        </div>
      </div>
    );
};

export default LetterList;