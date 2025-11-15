import React from "react";
import UserProfile from "./UserProfile";

function Icon({ username }) {
  return (
    <div>
      <p>Notification Icon</p>
      {}
      <UserProfile username={username} />
    </div>
  );
}

export default Icon;
