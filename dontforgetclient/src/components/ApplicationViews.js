import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import LetterList from "./letters/LetterList";
import LetterForm from "./letters/LetterForm";
import EditLetter from "./letters/EditLetter";
import ContactList from "./contacts/ContactList";
import ContactForm from "./contacts/ContactForm";
import EditContact from "./contacts/EditContact";
import EditUser from "./users/EditUser";
import {Login} from "./auth/Login";

const ApplicationViews = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/letter/list" element={<LetterList />} />
      <Route path="/letter/add" element={<LetterForm />} />
      <Route path="/letter/:Id/edit" element={<EditLetterWrapper />} />
      <Route path="/contact/list" element={<ContactList />} />
      <Route path="/contact/add" element={<ContactForm />} />
      <Route path="/contact/:Id/edit" element={<EditContactWrapper />} />
      <Route path="/user/:Id/edit" element={<EditUserWrapper />} />
    </Routes>
  );
};

const EditContactWrapper = () => {
  const { Id } = useParams();

  return <EditContact Id={Id} />;
};

const EditUserWrapper = () => {
  const { Id } = useParams();

  return <EditUser Id={Id} />;
};


const EditLetterWrapper = () => {
  const { Id } = useParams();

  return <EditLetter Id={Id} />;
};

export default ApplicationViews;
