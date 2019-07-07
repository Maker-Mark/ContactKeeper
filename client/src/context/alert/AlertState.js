import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import uuid from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = props => {
  //Hard coded auths for testing
  const initState = [];

  //useReducer takes any reducer and an initail state. We assign our state with the init state, giving our hard coded auths over.
  const [state, dispatch] = useReducer(alertReducer, initState);

  //Set alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  //Load user: Checks what user is logged in, hit the auth endpoint and get user dat
  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
        //Add actions here
      }}
    >
      {/* Anything we want to acess from other comoponts lik3 stat and actions go here(value) */}
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
