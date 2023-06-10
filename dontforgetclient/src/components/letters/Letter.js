import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Letter = ({ letter }) => {
  return (
    <Card className="m-4">
      {/* <p className="text-left px-2">Posted by: {post.userProfile.name}</p> */}
      {/* <CardImg top src={post.imageUrl} alt={post.title} /> */}
      <CardBody>
        <p>
          <strong>{letter.letterTitle}</strong>
        </p>
        <p>{letter.letterBody}</p>
        {/* link to edit letter here that includes delete option*/}
      </CardBody>
    </Card>
  );
};

export default Letter;