import React, { useContext, Fragment } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";

const Contacts = () => {
  //init our context
  const contactContext = useContext(ContactContext); //This let's us get the contact state locally
  const { contacts, filtered } = contactContext; //Pull out the contacts from the state
  if (contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }
  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map(contact => (
              <CSSTransition key={contact.id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contacts.map(contact => (
              <CSSTransition key={contact.id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;

//We want to pull in the contacts from the state and loop thought them
