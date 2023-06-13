import React, { useContext, useState } from "react";
import { Form, FormGroup, Card, CardBody, Label, Input, Button } from "reactstrap";
import { ContactContext } from "../../providers/ContactProvider";
import { useNavigate } from "react-router-dom";

const EditContact = () => {
    const { editContact, deleteContact } = useContext(ContactContext);
    const [contactName, setContactName] = useState("");
    const [contactMembers, setContactMembers] = useState("");
    const [contactAddress, setContactAddress] = useState("");
    const [contactBirthday, setContactBirthday] = useState("");


    const navigate = useNavigate();

    const submit = (e) => {
        const contact = {
            contactName,
            contactMembers,
            contactAddress,
            contactBirthday
        };

        editContact(contact).then((p) => {
            //navigate user back to home route currently set to letter list
            navigate.push("/");
        });
    };

    const handleDelete = () => {
        deleteContact().then((p) => {
            navigate.push("/");
        });
    };


    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="contactName">Contact Name</Label>
                                <Input id="contactName" onChange={(e) => setContactName(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="contactMembers">Family Members</Label>
                                <Input id="contactMembers" onChange={(e) => setContactMembers(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="contactAddress">Mailing Address</Label>
                                <Input id="contactAddress" onChange={(e) => setContactAddress(e.target.value)} />
                            </FormGroup>
                        </Form>
                        <Button color="info" onClick={submit}>
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

export default EditContact;