import React from "react";
import { useLocation } from "react-router-dom";

import "../index.css";
import MiddleSectionBox from "./MiddleSectionBox";

function HomeScreen(props) {
  const location = useLocation();
  const { user, pwd, practiceName, user_id } = location.state;
//   console.log(user);
//   console.log(pwd);
//   console.log(practiceName);
  console.log(user_id);

  return (
    <div className="Homepage">
      <div className="banner-section">
        <h1 className="banner-text">
          Welcome to <i>{practiceName}</i>
        </h1>
      </div>

      <div className="middle-section">
        <MiddleSectionBox
          state={{user_id, username: user, password: pwd, practiceName }}
          label="Therapy List"
          linkto="/therapylist"
        />
        <MiddleSectionBox state={{user_id}} label="Profile" linkto="/profile" />
      </div>

      <div className="middle-section">
        <MiddleSectionBox label="Progress" linkto="/progress" />
      </div>
    </div>
  );
}

export default HomeScreen;
