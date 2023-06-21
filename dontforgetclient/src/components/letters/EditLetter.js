import React, { useContext, useState, useEffect } from "react";
import { Form, FormGroup, Card, CardBody, Label, Input, Button } from "reactstrap";
import { LetterContext } from "../../providers/LetterProvider";
import { useNavigate, useParams } from "react-router-dom";

const EditLetter = () => {
    const { editLetter, deleteLetter } = useContext(LetterContext);
    const [letterTitle, setLetterTitle] = useState("");
    const [letterBody, setLetterBody] = useState("");
    const { Id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the letter data based on the Id parameter
        fetch(`https://localhost:7218/api/letter/${Id}`)
            .then(response => response.json())
            .then(data => {
                setLetterTitle(data.letterTitle);
                setLetterBody(data.letterBody);
            })
            .catch(error => {
                console.error("Error fetching letter data:", error);
            });
    }, [Id]);

    const handleSaveButtonClick = (event) => {
        event.preventDefault();

        const letter = {
            Id: Id,
            letterTitle: letterTitle,
            letterBody: letterBody
        };

        editLetter(Id, letter)
            .then(() => {
                navigate("/letter/list");
            })
            .catch(error => {
                console.error("Error updating letter:", error);
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
        deleteLetter(Id)
            .then(() => {
                navigate("/letter/list");
            })
            .catch(error => {
                console.error("Error deleting letter:", error);
            });
    };

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="letterTitle">Title</Label>
                                <Input
                                    id="letterTitle"
                                    value={letterTitle}
                                    onChange={(e) => setLetterTitle(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="letterBody">Letter Body</Label>
                                <Input
                                    id="letterBody"
                                    value={letterBody}
                                    onChange={(e) => setLetterBody(e.target.value)}
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

export default EditLetter;