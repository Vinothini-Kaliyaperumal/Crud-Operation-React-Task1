import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Myform from './Myform';
// import Home from './Home'; // Create a simple Home component

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
         
          <li>
            <Link to="/form">Form</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/form" element={<Myform />} />
      </Routes>
    </Router>
  );
};

export default App;
