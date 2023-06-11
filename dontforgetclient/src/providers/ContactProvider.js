import React, { useState, useEffect } from "react";

export const ContactContext = React.createContext();

export const ContactProvider = (props) => {
    const [contacts, setContacts] = useState([]);

    const getAllContacts = () => {
        return fetch("/api/contact")
            .then((res) => res.json())
            .then(setContacts);
    };

    useEffect(() => {
        getAllContacts();
      }, []);

    const addContact = (contact) => {
        return fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contact),
        });
    };

    const editContact = (id, contact) => {
        return fetch(`/api/contact/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contact),
        });
    };

    const deleteContact = (id, contact) => {
        return fetch(`/api/contact/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contact),
        });
    };

    const getContactById = (id) => {
        return fetch(`/api/contact/${id}`)
        .then((res) => res.json());
    };

    return (
        <ContactContext.Provider value={{ contacts, getAllContacts, addContact, editContact, deleteContact, getContactById }}>
            {props.children}
        </ContactContext.Provider>
    );
}