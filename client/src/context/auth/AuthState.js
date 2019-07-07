import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";
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
import setAuthToken from "../../utils/setAuthToken";

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

  //Load User: Get user data from backend adn put it into our state to validate our authentication.
  //We are making a req to the back end.
  // We want to set our token into a global header so we dont need to keep doing it.
  const loadUser = async () => {
    // @todo - load token into global headers
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      //This is a private route, so we need a token
      const res = await axios.get("api/auth");
      console.log(res.data + "HEEEEEEEEEELO");
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  //Register user: Sign user up get token back
  //Takes in form data,
  const register = async formData => {
    //Set up the config header
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    //Make a req
    try {
      //the res comes back with a promise. We are using our proxi, so no need to specifiy full URL
      //---> Takes in the route, data, and the config.
      const res = await axios.post("api/users/", formData, config); // We are hitting our API users/ POST
      //If all goes well, dispatch
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data // This will be the token
      });

      loadUser();
      //The catch from our API will get the details here
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg //Get our error message
      });
    }
  };

  //Login user: login user, get token
  const login = async formData => {
    //Set up the config header
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    //Make a req
    try {
      //the res comes back with a promise. We are using our proxi, so no need to specifiy full URL
      //---> Takes in the route, data, and the config.
      const res = await axios.post("api/auth/", formData, config); // We are hitting our API users/ POST
      //If all goes well, dispatch
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data // This will be the token
      });

      loadUser();
      //The catch from our API will get the details here
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg //Get our error message to our state
      });
    }
  };
  //Log out: Log out user, distroy toke
  const logout = () => dispatch({ type: LOGOUT });
  //Clear errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  //Return the provider so we can wrap our app with this context to get this state
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors
        //Add actions here
      }}
    >
      {/* Anything we want to acess from other comoponts lik3 stat and actions go here(value) */}
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
