import React from "react";
import { Routes, Route } from "react-router-dom";
import LetterList from "./LetterList";
import LetterForm from "./LetterForm";

const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={<LetterList />} />

            <Route path="/letter/add" element={<LetterForm />} />

            {/* <Route path="/letter/:id" element={<letterbyId />} /> */}
        </Routes>
    );
};

export default ApplicationViews;