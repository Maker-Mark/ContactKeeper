import {
  ADD_CONTACT,
  GET_CONTACTS,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_CONTACTS
} from "../types";
//Gives us dispatch
export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    case UPDATE_CONTACT:
      return {
        ...state, //If they match now that contact is equal to the patlaod, aka the updated contact.
        contacts: state.contacts.map(contact =>
          contact._id === action.payload._id ? action.payload : contact
        ),
        loading: false
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact._id !== action.payload
        )
      };
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      };
    case SET_CURRENT:
      return {
        //Current state
        ...state,
        //Set current to the contact we sent in by calling setCurrent from ContactState
        current: action.payload
      };
    case FILTER_CONTACTS:
      return {
        ...state, //For each contact, set the regext to the payload/text. GI= Global insensative(we dont care about case)
        filtered: state.contacts.filter(contact => {
          console.log(contact);
          const regex = new RegExp(action.payload, "gi");
          return contact.name.match(regex); //Return anything where the name or email matches the text || contact.email.match(regex)
        })
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        current: null,
        error: null,
        filtered: null,
        contacts: null
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case CLEAR_FILTER:
      return {
        ...state,
        current: null
      };

    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};
