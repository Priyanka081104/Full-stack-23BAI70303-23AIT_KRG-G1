import React, { useState } from 'react'; 
import './App.css'; 

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  }

  return (
    <div>
      <h2>User Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
          />
        </div>

        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
          />
        </div>

        <div>
          <label>Age:</label>
          <input 
            type="number" 
            name="age" 
            value={formData.age} 
            onChange={handleChange} 
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;