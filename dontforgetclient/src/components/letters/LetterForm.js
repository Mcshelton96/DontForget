import React, { useState, useContext } from "react";
import { Form, FormGroup, Card, CardBody, Label, Input, Button } from "reactstrap";
import { LetterContext } from "../../providers/LetterProvider";
import { useNavigate } from "react-router-dom";


const LetterForm = () => {
    const { addLetter } = useContext(LetterContext);
    const [userId, setUserId] = useState("");
    const [letterTitle, setLetterTitle] = useState("");
    const [letterBody, setLetterBody] = useState("");
  
    // Use this hook to allow us to programatically redirect users
    const navigate = useNavigate();
  
    const submit = (e) => {
      const letter = {
        letterTitle,
        letterBody,
        userId: +userId,
      };
  
      addLetter(letter).then((p) => {
        // Navigate the user back to the home route
        navigate("/");
      });
    };
  
    return (
      <div className="container pt-4">
        <div className="row justify-content-center">
          <Card className="col-sm-12 col-lg-6">
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="userId">User Id (For Now...)</Label>
                  <Input
                    id="userId"
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="LetterTitle">Letter Title</Label>
                  <Input
                    id="letterTitle"
                    onChange={(e) => setLetterTitle(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="LetterBody">Letter Body</Label>
                  <Input id="letterBody" onChange={(e) => setLetterBody(e.target.value)} />
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


// const LetterForm = () => {
//     const { addLetter } = useContext(LetterContext);
//     const [letterTitle, setLetterTitle] = useState("");
//     const [letterBody, setLetterBody] = useState("");
//     const [contacts, setContacts] = useState([]);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [searchResults, setSearchResults] = useState([]);
//     const [selectedContacts, setSelectedContacts] = useState([]);
  
//     // Use this hook to allow us to programmatically redirect users
//     const navigate = useNavigate();
  
//     const handleSearch = (e) => {
//       const query = e.target.value;
//       setSearchQuery(query);
  
//       // Perform your search logic here, e.g., filtering the contacts array based on the query
//       const filteredContacts = contacts.filter((contact) =>
//         contact.name.toLowerCase().includes(query.toLowerCase())
//       );
//       setSearchResults(filteredContacts);
//     };
  
//     const addRecipient = (contact) => {
//       setSelectedContacts((prevContacts) => [...prevContacts, contact]);
//     };
  
//     const removeContact = (contact) => {
//       setSelectedContacts((prevContacts) =>
//         prevContacts.filter((prevContact) => prevContact.id !== contact.id)
//       );
//     };
  
//     const submit = (e) => {
//       const letter = {
//         letterTitle,
//         letterBody,
//         contacts: selectedContacts,
//       };
  
//       addLetter(letter).then((p) => {
//         // Navigate the user back to the home route
//         navigate.push("/");
//       });
//     };
  
//     const handleContactChange = (e) => {
//       const contactNames = e.target.value.split(",").map((name) => name.trim());
//       setContacts(contactNames);
  
//       // Add any added recipients to the selectedContacts array or update the recipient field value as needed
//     };
  
//     return (
//       <div className="container pt-4">
//         <div className="row justify-content-center">
//           <Card className="col-sm-12 col-lg-6">
//             <CardBody>
//               <Form>
//                 <FormGroup>
//                   <Label for="letterRecipients">Add Contacts (separated by commas)</Label>
//                   <Input
//                     type="text"
//                     id="letterRecipients"
//                     value={searchQuery}
//                     onChange={handleSearch}
//                   />
//                   <ul>
//                     {searchResults.map((contact) => (
//                       <li key={contact.id}>
//                         {contact.name}
//                         <button onClick={() => addRecipient(contact)}>Add</button>
//                       </li>
//                     ))}
//                   </ul>
//                 </FormGroup>
//                 <div>
//                   <h5>Selected Contacts:</h5>
//                   <ul>
//                     {selectedContacts.map((contact) => (
//                       <li key={contact.id}>
//                         {contact.name}
//                         <button onClick={() => removeContact(contact)}>Remove</button>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//                 <FormGroup>
//                   <Label for="letterTitle">Title</Label>
//                   <Input id="letterTitle" onChange={(e) => setLetterTitle(e.target.value)} />
//                 </FormGroup>
//                 <FormGroup>
//                   <Label for="letterBody">Letter Body</Label>
//                   <Input id="letterBody" onChange={(e) => setLetterBody(e.target.value)} />
//                 </FormGroup>
//               </Form>
//               <Button color="info" onClick={submit}>
//                 SUBMIT
//               </Button>
//             </CardBody>
//           </Card>
//         </div>
//       </div>
//     );
//   };
  
//   export default LetterForm;