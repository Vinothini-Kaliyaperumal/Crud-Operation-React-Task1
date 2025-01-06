import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TablePage.css';

const TablePage = ({ data, setData, setEditData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewData, setViewData] = useState(null);
  const navigate = useNavigate();

  const handleDelete = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditData(index);
    navigate('/');
  };

  const filteredData = data.filter((person) =>
    Object.values(person).some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const closeModal = () => {
    setViewData(null);
  };

  return (
    <div className="table-container">
      <h1 className="table-header">Table Page</h1>
      <div className="search-container">
        <input
          className="search-input"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Modal for View Data */}
      {viewData && (
        <div
          className="modal show"
          style={{
            display: 'block',
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            zIndex: '1050',
            paddingTop: '10px',
            paddingBottom: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',  // Semi-transparent background
            overflowY: 'auto',
            transition: 'all 0.3s ease-in-out',
          }}
          aria-labelledby="viewDataModal"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-lg shadow-lg">
              {/* Modal Header */}
              <div
                className="modal-header"
                style={{
                  background: 'linear-gradient(45deg, #6a1b9a, #e91e63)', // Dual-color gradient
                  color: 'white',
                  borderTopLeftRadius: '15px',
                  borderTopRightRadius: '15px',
                  padding: '15px 30px',
                }}
              >
                <h5 className="modal-title">View Details</h5>
                <button
                  type="button"
                  className="close text-white"
                  onClick={closeModal}
                  aria-label="Close"
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              {/* Modal Body */}
              <div
                className="modal-body"
                style={{
                  padding: '20px',
                  maxHeight: '60vh',  // Set a maximum height for the modal body
                  overflowY: 'auto',  // Enable vertical scrolling if content overflows
                  backgroundColor: '#f8f9fa',  // Light background for content area
                }}
              >
                <table className="table table-borderless">
                  <tbody>
                    {Object.entries(viewData).map(([key, value]) => (
                      <tr key={key}>
                        <td
                          style={{
                            fontWeight: 'bold',
                            color: '#6a1b9a',
                            textTransform: 'capitalize',
                            width: '35%',
                          }}
                        >
                          {key}
                        </td>
                        <td style={{ color: '#333' }}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer" style={{ borderTop: 'none' }}>
                <button
                  className="btn btn-light"
                  onClick={closeModal}
                  style={{
                    borderRadius: '20px',
                    padding: '10px 25px',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s ease',
                    backgroundColor: '#e91e63',  // Dual-color for button
                    color: '#fff',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#d81b60')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '#e91e63')}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <table className="table table-hover">
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => <th key={key}>{key.toUpperCase()}</th>)}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((person, index) => (
              <tr key={index}>
                {Object.values(person).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-info view-btn"
                      onClick={() => setViewData(person)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-warning action-btn"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger action-btn"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={data.length > 0 ? Object.keys(data[0]).length + 1 : 1}>
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablePage;
