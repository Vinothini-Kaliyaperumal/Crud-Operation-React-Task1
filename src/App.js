import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import FormPage from './FormPage';
import TablePage from './TablePage';
import './App.css';
import { DataTable } from 'primereact/datatable';

const App = () => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData')) || [];
    setData(storedData);
  }, []);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(data));
  }, [data]);

  return (
    <Router>
      {/* Simple Navbar */}
      <nav className="navbar">
        <a href="/" className="brand">My App</a>
        <div className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Form
          </NavLink>
          <NavLink
            to="/table"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Table
          </NavLink>
        </div>
      </nav>

      {/* Routes for FormPage and TablePage */}
      <Routes>
        <Route
          path="/"
          element={<FormPage data={data} setData={setData} editData={editData} setEditData={setEditData} />}
        />
        <Route
          path="/table"
          element={<TablePage data={data} setData={setData} setEditData={setEditData} />}
        />
         <Route
          path="/datatable"
          element={<DataTable/>}
        />
      </Routes>
    </Router>
  );
};

export default App;
