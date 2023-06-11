import React, { useContext, useEffect } from "react";
import { LetterContext } from "../../providers/LetterProvider";
import Letter from "./Letter"
import { Link } from "react-router-dom";


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
        <div className="row justify-content-center mt-4">
                <Link to="/letter/edit" className="btn btn-primary">Edit Letter</Link>
            </div>
      </div>
    );
};

export default LetterList;