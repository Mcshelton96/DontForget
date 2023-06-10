import React, { useState, useContext } from "react";
import { Form, FormGroup, Card, CardBody, Label, Input, Button } from "reactstrap";
import { LetterContext } from "../../providers/LetterProvider";
import { useNavigate } from "react-router-dom";

const LetterForm = () => {
    const { addLetter } = useContext(LetterContext);
    const [userProfileId, setUserProfileId] = useState("");
    const [letterTitle, setLetterTitle] = useState("");
    const [letterBody, setLetterBody] = useState("");

    // Use this hook to allow us to programatically redirect users
    const navigate = useNavigate();

    const submit = (e) => {
        const letter = {
            letterTitle,
            letterBody,
            userProfileId: +userProfileId
        };

        addLetter(letter).then((p) => {
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
                                <Label for="letterTitle">Title</Label>
                                <Input id="letterTitle" onChange={(e) => setLetterTitle(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="letterBody">Letter Body</Label>
                                <Input
                                    id="letterBody"
                                    onChange={(e) => setLetterBody(e.target.value)}
                                />
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

export default LetterForm;