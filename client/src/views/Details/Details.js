import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Details.css'; 

function Details() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5003/users");
      setUsers(response.data.data); 
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              <strong>{user.name}</strong>
              {user.email} | {user.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}  

export default Details;
