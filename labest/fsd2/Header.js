import React from "react";
import Icon from "./Icon";

function Header({ username }) {
  return (
    <header style={{ border: "1px solid gray", padding: "10px" }}>
      <h2>App Header</h2>
      {/* Passing username to Icon */}
      <Icon username={username} />
    </header>
  );
}

export default Header;
