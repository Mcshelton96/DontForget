import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Letter = ({ letter }) => {
  return (
    <Card className="m-4">
      <CardBody>
        <header>
          <Link to={`/letter/${letter.id}/edit`}>Edit: {letter.letterTitle}</Link>
        </header>
        <p>
          <strong>{letter.letterTitle}</strong>
        </p>
        <p>{letter.letterBody}</p>
      </CardBody>
    </Card>
  );
};

export default Letter;