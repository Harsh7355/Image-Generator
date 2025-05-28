import React, { useEffect, useState } from 'react';
import './AdminContact.css'; // Optional: if you want styling

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);

  const URL = "http://localhost:8080/api/admin/contacts";
  const token = localStorage.getItem('token');
  const authorizationtoken = `Bearer ${token}`;

  const getAllContacts = async () => {
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: authorizationtoken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Contact data:", data);
        setContacts(data || []); // Make sure your backend returns `contacts: []`
      }
    } catch (error) {
      console.log("Error is received from backend side:", error.message);
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <div className="admin-contact-container">
      <h2 className="contact-heading">Admin Panel - Contacts</h2>

      <div className="table-wrapper">
        <table className="contact-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Contact Name</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>

          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-data">No contacts found.</td>
              </tr>
            ) : (
              contacts.map((contact, index) => (
                <tr key={contact._id}>
                  <td>{index + 1}</td>
                  <td>{contact.username}</td>
                  <td>{contact.email}</td>
                  <td>{contact.message}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminContact;
