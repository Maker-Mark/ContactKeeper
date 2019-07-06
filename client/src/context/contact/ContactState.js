import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../types";

const ContactState = props => {
  //Hard coded contacts for testing
  const initState = {
    contacts: [
      {
        id: 1,
        name: "Bob Markly",
        email: "Jush@gmai.com",
        phone: "123-322-3332",
        type: "professional"
      },
      {
        id: 2,
        name: "Alex Goldman",
        phone: "543-254-3645",
        type: "personal"
      },
      {
        id: 3,
        name: "Jake Jonson",
        phone: "434-44-2456",
        type: "personal"
      }
    ]
  };

  //useReducer takes any reducer and an initail state. We assign our state with the init state, giving our hard coded contacts over.
  const [state, dispatch] = useReducer(contactReducer, initState);

  //Add contact --CRUD--
  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  //Delete contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  //Set current contact

  //Clear current contact

  //Update contact

  //Filter contacts

  //Clear filter

  //Return the provider so we can wrap our app with this context to get this state
  return (
    <ContactContext.Provider
      value={{ contacts: state.contacts, addContact, deleteContact }}
    >
      {/* Anything we want to acess from other comoponts lik3 stat and actions go here(value) */}
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
