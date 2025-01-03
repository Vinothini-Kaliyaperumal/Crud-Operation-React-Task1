import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TablePage.css'

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
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: '1050',
            maxWidth: '90%',
            width: '500px',
          }}
          aria-labelledby="viewDataModal"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="viewDataModal">
                  View Details
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <table className="table table-striped table-borderless">
                  <tbody>
                    {Object.entries(viewData).map(([key, value]) => (
                      <tr key={key}>
                        <td
                          style={{
                            fontWeight: 'bold',
                            color: '#007bff',
                            textTransform: 'capitalize',
                            width: '40%',
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
              <div className="modal-footer">
                <button className="view-btn" onClick={closeModal}>
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
