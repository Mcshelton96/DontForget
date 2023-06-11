import React, { useContext, useState } from "react";
import { Form, FormGroup, Card, CardBody, Label, Input, Button } from "reactstrap";
import { LetterContext } from "../../providers/LetterProvider";
import { useNavigate } from "react-router-dom";

const EditLetter = () => {
    const { editLetter, deleteLetter } = useContext(LetterContext);
    const [letterTitle, setLetterTitle] = useState("");
    const [letterBody, setLetterBody] = useState("");

    const navigate = useNavigate();

    const submit = (e) => {
        const letter = {
            letterTitle,
            letterBody,
        };

        editLetter(letter).then((p) => {
            //navigate user back to home route currently set to letter list
            navigate.push("/");
        });
    };

    const handleDelete = () => {
        deleteLetter().then((p) => {
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
                        <Button color="danger" onClick={handleDelete}>
                            DELETE
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default EditLetter;