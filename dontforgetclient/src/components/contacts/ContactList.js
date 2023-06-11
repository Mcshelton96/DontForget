import React, { useContext, useEffect } from "react";
import { ContactContext } from "../../providers/ContactProvider";
import Contact from "./Contact"
import { Link } from "react-router-dom";


const ContactList = () => {
    const { contacts, getAllContacts } = useContext(ContactContext);

    useEffect(() => {
        getAllContacts();
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
        <div className="row justify-content-center mt-4">
                <Link to="/contact/edit" className="btn btn-primary">Edit Contact</Link>
            </div>
      </div>
    );
};

export default ContactList;