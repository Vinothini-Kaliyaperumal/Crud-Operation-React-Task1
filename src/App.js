
// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FormPage from './FormPage';
import TablePage from './TablePage';



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
      <nav>
        <Link to="/">Form</Link> | <Link to="/table">Table</Link>
      </nav>
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
