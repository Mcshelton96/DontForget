import React, { useState, useContext } from "react";
import { Form, FormGroup, Card, CardBody, Label, Input, Button } from "reactstrap";
import { ContactContext } from "../../providers/ContactProvider";
import { useNavigate } from "react-router-dom";

const ContactForm = () => {
    const { addContact } = useContext(ContactContext);
    const [contactName, setContactName] = useState("");
    const [contactAddress, setContactAddress] = useState("");
    const [contactMembers, setContactMembers] = useState("");


    // Use this hook to allow us to programatically redirect users
    const navigate = useNavigate();

    const submit = (e) => {
        const contact = {
            contactName,
            contactMembers,
            contactAddress,
            contactBirthday
            // userProfileId: +userProfileId
        };

        addContact(contact).then((p) => {
            //navigate user back to home route
            navigate.push("/");
        });
    };

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            {/* <FormGroup>
                  <Label for="userId">User Id (For Now...)</Label>
                  <Input
                    id="userId"
                    onChange={(e) => setUserProfileId(e.target.value)}
                  />
                </FormGroup> */}
                            {/* <FormGroup>
                  <Label for="imageUrl">Gif URL</Label>
                  <Input
                    id="imageUrl"
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </FormGroup> */}
                            <FormGroup>
                                <Label for="ContactName">Contact Name</Label>
                                <Input id="ContactName" onChange={(e) => setContactName(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="ContactMembers">Family Members</Label>
                                <Input id="contactMembers" onChange={(e) => setContactMembers(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="contactAddress">Mailing Address</Label>
                                <Input id="contactAddress" onChange={(e) => setContactAddress(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="contactBirthday">Contact Birthday</Label>
                                <Input id="contactBirthday" onChange={(e) => setContactBirthday(e.target.value)} />
                            </FormGroup>
                        </Form>
                        <Button color="info" onClick={submit}>
                            SUBMIT
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ContactForm;