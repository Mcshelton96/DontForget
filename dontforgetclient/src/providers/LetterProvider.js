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

    const editLetter = (Id, letter) => {
        return fetch(`/api/letter/${Id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(letter),
        });
    };

    const deleteLetter = (Id, letter) => {
        return fetch(`/api/letter/${Id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(letter),
        });
    };

    const getLetterById = (id) => {
        return fetch(`/api/letter/${id}`)
        .then((res) => res.json());
    };

    return (
        <LetterContext.Provider value={{ letters, GetAllLetters, addLetter, editLetter, deleteLetter, getLetterById }}>
            {props.children}
        </LetterContext.Provider>
    );
}