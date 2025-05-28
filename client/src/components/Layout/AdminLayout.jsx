import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaUsers, FaServicestack, FaAddressBook, FaHome } from 'react-icons/fa';

const AdminLayout = () => {
  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul className="admin-nav">
              <li>
                <NavLink to="/admin/users">
                  <FaUsers className="icon" /> Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/services">
                  <FaServicestack className="icon" /> Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/contacts">
                  <FaAddressBook className="icon" /> Contacts
                </NavLink>
              </li>
              <li>
                <NavLink to="/">
                  <FaHome className="icon" /> Home
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AdminLayout;
