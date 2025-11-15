
import React from "react";

function UserProfile({ username }) {
  return (
    <div style={{ marginTop: "10px", padding: "10px", border: "1px solid blue" }}>
      <h3>User Profile</h3>
      <p>Username: {username}</p>
    </div>
  );
}

export default UserProfile;
