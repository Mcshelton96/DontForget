import React from "react";
import { Routes, Route } from "react-router-dom";
import LetterList from "./letters/LetterList";
import LetterForm from "./letters/LetterForm";
import EditLetter from "./letters/EditLetter";

const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={<LetterList />} />

            <Route path="/letter/add" element={<LetterForm />} />

            <Route path="/letter/edit" element={<EditLetter />} />

            {/* <Route path="/letter/:id" element={<letterbyId />} /> */}
        </Routes>
    );
};

export default ApplicationViews;