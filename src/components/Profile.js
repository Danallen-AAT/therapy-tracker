import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import "../index.css";

function Profile() {
  const [user, setUser] = useState([]);
  const location = useLocation();
  const { user_id } = location.state;
  // const urlBase = "http://192.168.0.38:5000";
  const urlBase = "https://flask-service.bp0d6s37bhscg.us-west-2.cs.amazonlightsail.com/";
  const headers = { "Content-Type": "application/json" };

  useEffect(() => {
    console.log(user_id);
    const body = { user_id };
    const config = {
      method: "POST",
      baseURL: urlBase,
      url: "/fetchuser",
      headers,
      data: body,
    };
    axios(config).then((response) => {
      console.log(response.data.user_row);
      const username = response.data.user_row;
      setUser([username]);
    });
  }, []);

  return (
    <div>
      <div className="top-section">
        <img
          class="user-photo"
          src="../images/profile-photo.jpg"
          alt="profile"
        />
        <div>
          <p>{user[0]}</p>
          <br />
          <p>1/1/1975</p>
          <br />
          <p>Male</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
