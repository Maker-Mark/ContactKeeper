import axios from "axios";

const setAuthToken = token => {
  if (token) {
    //If we have a token, set the default headers to that token so we can store it
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    //Otherwise, delete what's there
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
