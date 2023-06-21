import React, { useContext, useState, useEffect } from "react";
import { Form, FormGroup, Card, CardBody, Label, Input, Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";

const EditUser = () => {
    const { editUser, deleteUser } = useContext(UserContext);
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const { Id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the letter data based on the Id parameter
        fetch(`https://localhost:7218/api/user/${Id}`)
            .then(response => response.json())
            .then(data => {
                setName(data.name);
                setUserName(data.username);
                setEmail(data.email);
                setAddress(data.address)
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, [Id]);

    const handleSaveButtonClick = (event) => {
        event.preventDefault();

        const user = {
            Id: Id,
            name: name,
            userName: userName,
            email: email,
            address: address
        };

        editUser(Id, user)
            .then(() => {
                navigate("/");
            })
            .catch(error => {
                console.error("Error updating user:", error);
            });
    };

    // const submit = (e) => {
    //     const letter = {
    //         letterTitle,
    //         letterBody,
    //     };

    //     editLetter(letter).then((p) => {
    //         //navigate user back to home route currently set to letter list
    //         navigate.push("/");
    //     });
    // };

    const handleDelete = () => {
        deleteUser(Id)
            .then(() => {
                navigate("/");
            })
            .catch(error => {
                console.error("Error deleting User:", error);
            });
    };

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="Name">Name</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="userName">User Name</Label>
                                <Input
                                    id="userName"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="address">Address</Label>
                                <Input
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </FormGroup>
                        </Form>
                        <Button color="info" onClick={handleSaveButtonClick}>
                            SUBMIT
                        </Button>
                        <Button color="danger" onClick={handleDelete}>
                            DELETE
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default EditUser;