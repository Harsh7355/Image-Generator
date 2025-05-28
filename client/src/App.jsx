import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './page/Home';
import About from './page/About';
import Services from './page/Services';
import Contact from './page/Contact';
import Register from './page/Register';
import Login from './page/Login';
import Logout from './page/Logout';
import AdminLayout from './components/Layout/AdminLayout';
import AdminService from './page/AdminService';
import AdminUsers from './page/AdminUsers';
import AdminContact from './page/AdminContact';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route  path='/admin' element={<AdminLayout />}>
             <Route path='users' element={<AdminUsers/>}></Route>
             <Route path='contacts' element={<AdminContact/>}></Route>
             <Route path='services' element={<AdminService/>}></Route>
        </Route>

      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default App;
