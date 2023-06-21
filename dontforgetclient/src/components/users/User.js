import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const User = ({ user }) => {
  return (
    <Card className="m-4">
      <CardBody>
        <header>
          <Link to={`/user/${user.id}/edit`}>Edit: {user.name}</Link>
        </header>
        <p>
          <strong>{user.name}</strong>
        </p>
        <p>{user.userName}</p>
        <p>{user.address}</p>
        <p>{user.email}</p>
      </CardBody>
    </Card>
  );
};

export default User;