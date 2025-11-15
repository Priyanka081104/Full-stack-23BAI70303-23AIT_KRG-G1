import React, {useState} from "react";
import "./CounterApp.css";

function CounterApp() {
  const[count,setCount]=useState(0);
  
  const increment=()=>{
    setCount(count+1);
  };

  return (
    <div className="container">
      <h1>Counter App</h1>
      <h2>{count}</h2>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default CounterApp;
