import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import FormPage from './FormPage';
import TablePage from './TablePage';
import './App.css';

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
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">My App</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  Form
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/table"
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  Table
                </NavLink>
              </li>
            </ul>
          </div>
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
      </Routes>
    </Router>
  );
};

export default App;
