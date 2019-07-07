import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from "../types";

const AuthState = props => {
  //Hard coded auths for testing
  const initState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  //useReducer takes any reducer and an initail state. We assign our state with the init state, giving our hard coded auths over.
  const [state, dispatch] = useReducer(authReducer, initState);

  //Load user: Checks what user is logged in, hit the auth endpoint and get user data

  //Register user: Sign user up get toke back

  //Login user: login user, get token

  //Log out: Log out user, distroy toke

  //Clear errors

  //Return the provider so we can wrap our app with this context to get this state
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error
        //Add actions here
      }}
    >
      {/* Anything we want to acess from other comoponts lik3 stat and actions go here(value) */}
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
