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
      console.log(response, 'response');
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
      {users.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Name</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Email</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{user.name}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{user.email}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Form;
