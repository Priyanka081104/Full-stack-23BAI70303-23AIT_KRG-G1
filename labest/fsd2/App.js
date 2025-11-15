import React from "react";
import Header from "./Header";

function App() {
  const username = "Shreshta";

  return (
    <div>
      <h1>Welcome to the App!</h1>
      {/* Passing username to Header */}
      <Header username={username} />
    </div>
  );
}

export default App;
