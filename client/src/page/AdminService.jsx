import React, { useEffect, useState } from 'react';
import './AdminService.css'; // 👈 Create this CSS file

const AdminService = () => {
  const [services, setServices] = useState([]);

  const token = localStorage.getItem('token');
  const authorizationtoken = `Bearer ${token}`;
  const url = "http://localhost:8080/api/admin/services";

  const getAllServices = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: authorizationtoken,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Service data:", data);
        setServices(data); // make sure backend returns `services` array
      } else {
        console.error("Fetch failed:", response.status);
      }
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);

  return (
    <div className="admin-service-container">
      <h2 className="admin-heading">Admin Panel - Services</h2>

      <div className="table-wrapper">
        <table className="services-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Service Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">No services found.</td>
              </tr>
            ) : (
              services.map((service, index) => (
                <tr key={service._id}>
                  <td>{index + 1}</td>
                  <td>{service.service}</td>
                  <td>{service.description || "N/A"}</td>
                  <td>₹ {service.price || "N/A"}</td>
                  <td>{new Date(service.createdAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminService;
