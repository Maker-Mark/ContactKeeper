import React, { useContext, Fragment } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";

const Contacts = () => {
  //init our context
  const contactContext = useContext(ContactContext); //This let's us get the contact state locally
  const { contacts } = contactContext; //Pull out the contacts from the state
  return (
    <Fragment>
      {contacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </Fragment>
  );
};

export default Contacts;

//We want to pull in the contacts from the state and loop thought them
