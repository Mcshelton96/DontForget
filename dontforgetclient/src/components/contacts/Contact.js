import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Contact = ({ contact }) => {
  return (
    <Card className="m-4">
      <CardBody>
      <header>
          <Link to={`/contact/${contact.id}/edit`}>Edit: </Link>
        </header>
        <p>
          <strong>{contact.contactName}</strong>
        </p>
        <p>{contact.contactAddress}</p>
        {/* link to edit letter here that includes delete option*/}
      </CardBody>
    </Card>
  );
};

export default Contact;