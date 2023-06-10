import React, { useContext, useEffect } from "react";
import { ContactContext, LetterContext } from "../../providers/ContactProvider";
import Contact from "./Contact"


const ContactList = () => {
    const { contacts, GetAllContacts } = useContext(ContactContext);

    useEffect(() => {
        GetAllContacts();
    }, []);

    return (
        <div className="container">
        <div className="row justify-content-center">
          <div className="cards-column">
            {contacts.map((contact) => (
              <Contact key={contact.id} contact={contact} />
            ))}
          </div>
        </div>
      </div>
    );
};

export default ContactList;