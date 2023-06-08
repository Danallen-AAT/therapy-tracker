import React, { useState } from "react";
import axios from "axios";
import { Link} from "react-router-dom";

import "../index.css";

function SigninScreen({ practiceName }) {
  // use useState to set the state of the variable username, password, newUser, signinSuccessful

  const [state, setState] = useState({
    username: null,
    user_id: null,
    password: null,
    newuser: false,
    signinSuccessful: false,
  });

  const { username, password, newuser, signinSuccessful } = state;

  //   this.userInfo = ;
  const urlBase = "https://flask-servicev1.bp0d6s37bhscg.us-west-2.cs.amazonlightsail.com/"
  // const urlBase = "http://192.168.0.38:5000";
  const signinEndpoint = "/login";
  const newUserEndpoint = "/registeruser";
  //   constructor() {
  //     super();

  //   }

  function loginChange(e, type) {
    setState({ ...state, [type]: e.target.value });
  }

  function login() {
    const { username, password } = state;
    const headers = { "Content-Type": "application/json" };
    const body = {
      username: username,
      password: password,
    };
    const config = {
      method: "POST",
      url: signinEndpoint,
      baseURL: urlBase,
      headers: headers,
      data: body,
    };
    //axios call here
    axios(config)
      .then((response) => {
        const data = response.data;
        if (!data["user_row"]) {
          //make a new component visible for the user to "Create account"
          setState({ ...state, newuser: true });
        } else {
          //navigate to homescreen
          setState({ ...state, signinSuccessful: true, user_id: data.user_row[0] });
        }
      })
      .catch((err) => console.log(err));
  }

  function addNewUser() {
    const { username, password } = state;
    const headers = { "Content-Type": "application/json" };
    const config = {
      method: "POST",
      baseURL: urlBase,
      url: newUserEndpoint,
      headers: headers,
      data: { username, password },
    };

    axios(config).then((response) => {
      //return the username
      //navigate to next screen
      const user_id = response.data.userid
      setState({ ...state, newuser: false, signinSuccessful: true, user_id });
    });
  }

  return (
    <div className="SigninScreen">
      <div className="banner-section">
        <h1 className="banner-text">
          Welcome to <i>{practiceName}</i>
        </h1>
      </div>

      <div className="signin-box">
        <h3>Sign In</h3>
        <span>Username: </span>
        <input
          onChange={(e) => loginChange(e, "username")}
          value={username}
        />
        <span>Password: </span>
        <input
          onChange={(e) => loginChange(e, "password")}
          value={password}
        />
        <button style={{ "margin-top": "5px" }} onClick={() => login()}>
          Sign In
        </button>
        {newuser && (
          <div>
            <p>No account found. Create one now?</p>
            <button
              style={{ "margin-top": "5px" }}
              onClick={() => addNewUser()}
            >
              Create New Account
            </button>
          </div>
        )}

        {signinSuccessful && (
          <div>
            <p>
              Account Created. Click the button to continue to the homepage.
            </p>
            <Link
              to="/homepage"
              state={{
                user_id: state.user_id,
                user: username,
                pwd: password,
                practiceName: practiceName,
              }}
            >
              <button>Go</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default SigninScreen;
