import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import LetterList from "./letters/LetterList";
import LetterForm from "./letters/LetterForm";
import EditLetter from "./letters/EditLetter";
import ContactList from "./contacts/ContactList";
import ContactForm from "./contacts/ContactForm";
import EditContact from "./contacts/EditContact";

const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/" element={<LetterList />} />
      <Route path="/letter/add" element={<LetterForm />} />
      <Route path="/letter/:Id/edit" element={<EditLetterWrapper />} />
      <Route path="/contact/list" element={<ContactList />} />
      <Route path="/contact/add" element={<ContactForm />} />
      <Route path="/contact/:Id/edit" element={<EditContact />} />

    </Routes>
  );
};

const EditLetterWrapper = () => {
  const { Id } = useParams();

  return <EditLetter Id={Id} />;
};

export default ApplicationViews;
