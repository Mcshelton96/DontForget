import React, { useContext, useEffect } from "react";
import { LetterContext } from "../providers/LetterProvider";

const LetterList = () => {
    const { letters, GetAllLetters } = useContext(LetterContext);

    useEffect(() => {
        GetAllLetters();
    }, []);

    return (
        <div>
            {letters.map((letter) => (
                <div key={letter.id}>
                    <p>
                        <strong>{letter.letterTitle}</strong>
                    </p>
                    <p>{letter.letterBody}</p>
                </div>
            ))}
        </div>
    );
};

export default LetterList;