import React, { useEffect, useState } from 'react';
import './AdminUsers.css'; // Import CSS here

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    username: '',
    email: '',
    phone: '',
  });

  const token = localStorage.getItem('token');
  const authorizationtoken = `Bearer ${token}`;
  const url = "http://localhost:8080/api/admin/users";

  const getAllUsersData = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: authorizationtoken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Fetch failed:", response.status);
      }
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  const handleEdit = (user) => {
    setEditUserId(user._id);
    setEditFormData({
      username: user.username,
      email: user.email,
      phone: user.phone || '',
    });
  };

  const handleInputChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/users/${editUserId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationtoken,
        },
        body: JSON.stringify(editFormData),
      });

      if (response.ok) {
        alert("User updated successfully");
        setEditUserId(null);
        getAllUsersData();
      } else {
        alert("Update failed");
        console.error("Update failed:", response.status);
      }
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationtoken,
        },
      });

      if (response.ok) {
        getAllUsersData(); // Refresh list
      } else {
        console.error("Delete failed:", response.status);
      }
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-heading">Admin Panel - Users</h2>

      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Is Admin</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">No users found.</td>
              </tr>
            ) : (
              users.map((user, index) => (
                <React.Fragment key={user._id}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone || "N/A"}</td>
                    <td className={user.isadmin ? "yes" : "no"}>
                      {user.isadmin ? "Yes" : "No"}
                    </td>
                    <td>{new Date(user.createdAt).toLocaleString()}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
                    </td>
                  </tr>

                  {editUserId === user._id && (
                    <tr>
                      <td colSpan="7">
                        <div className="edit-form">
                          <input
                            type="text"
                            name="username"
                            value={editFormData.username}
                            onChange={handleInputChange}
                            placeholder="Username"
                          />
                          <input
                            type="email"
                            name="email"
                            value={editFormData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                          />
                          <input
                            type="text"
                            name="phone"
                            value={editFormData.phone}
                            onChange={handleInputChange}
                            placeholder="Phone"
                          />
                          <button className="btn" onClick={handleUpdate}>Update</button>
                          <button className="btn secondary-btn" onClick={() => setEditUserId(null)}>Cancel</button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
