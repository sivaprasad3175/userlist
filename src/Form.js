import React, { useState, useEffect } from "react";

const Form = () => {
  // State to hold form values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: ""
  });

  // State to show success message
  const [submitted, setSubmitted] = useState(false);

  // State to hold the list of users
  const [users, setUsers] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await fetch("https://users-2-j0ak.onrender.com/api/user/fetch");
      console.log(response,'respone')
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    try {
      const response = await fetch("https://users-2-j0ak.onrender.com/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true); // Show success message

        // Fetch updated list of users
        fetchUsers();

        // Reset form fields
        setFormData({
          name: "",
          email: "",
          address: "",
        });

        // Optionally hide the success message after a few seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 3000); // Hide message after 3 seconds
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>React Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address: </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
      {submitted && <p style={{ color: "green" }}>Form submitted successfully!</p>}

      <h2>User List</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user._id}>
              <strong>Name:</strong> {user.name} <br />
              <strong>Email:</strong> {user.email} <br />
              <strong>Address:</strong> {user.address}
            </li>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </ul>
    </div>
  );
};

export default Form;
