import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaEdit, FaEye, FaSearch } from 'react-icons/fa'; // Import icons
import 'bootstrap/dist/css/bootstrap.min.css';
import './TablePage.css';

const TablePage = ({ data, setData, setEditData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewData, setViewData] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'green';
      case 'inactive':
        return 'red';
      case 'pending':
        return 'yellow';
      default:
        return 'transparent';
    }
  };

  const handleSelectRow = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((_, index) => index));
    }
  };

  return (
    <div className="table-container">
      <h1 className="table-header">Table Page</h1>
      <div className="search-container" style={{ position: 'relative', width: '250px' }}>
        <input
          className="search-input"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            paddingLeft: '40px', // Increase space for the icon
            backgroundColor: '#f0f0f0', // Set your desired background color
            border: '1px solid #ccc', // Light border
            borderRadius: '5px',
            padding: '10px',
            width: '100%',
            fontSize: '16px',
            outline: 'none', // Removes default outline on focus
          }}
        />
        <FaSearch
          size={20}
          style={{
            position: 'absolute',
            left: '10px', // Icon positioned inside the input
            top: '50%',
            transform: 'translateY(-50%)', // Vertically center the icon
            color: '#888', // Icon color
          }}
        />
      </div>

      {/* Modal to View Data */}
      {viewData && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">View Profile</h5>
                <button type="button" className="close" onClick={closeModal}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                {/* Format and display the view data (JSON structure) */}
                <pre>{JSON.stringify(viewData, null, 2)}</pre>
              </div>
              <div className="modal-footer">
                {/* Close Button */}
                <button className="close-btn" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conditionally render the table if data is available */}
      {data.length > 0 ? (
        <table className="table table-hover">
          <thead>
            <tr>
              {/* Select All Checkbox */}
              <th>
                <input
                  type="checkbox"
                  id="selectAll"
                  checked={selectedRows.length === data.length}
                  onChange={handleSelectAll}
                />
                <label htmlFor="selectAll"></label>
              </th>
              {data.length > 0 &&
                Object.keys(data[0]).map((key) => <th key={key}>{key.toUpperCase()}</th>)}
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((person, index) => (
                <tr key={index}>
                  {/* Custom Checkbox for Individual Row Selection */}
                  <td>
                    <input
                      type="checkbox"
                      id={`checkbox-${index}`}
                      checked={selectedRows.includes(index)}
                      onChange={() => handleSelectRow(index)}
                    />
                    <label htmlFor={`checkbox-${index}`}></label>
                  </td>
                  {Object.entries(person).map(([key, value]) => (
                    <td key={key}>
                      {key === 'status' ? (
                        <button
                          className="status-button"
                          style={{
                            backgroundColor: getStatusColor(value),
                            color: 'white',
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                          }}
                        >
                          {value}
                        </button>
                      ) : (
                        value
                      )}
                    </td>
                  ))}
                  <td>
                    <div className="action-buttons">
                      {/* View Icon */}
                      <FaEye
                        size={20}
                        className="action-icon view-icon"
                        title="View"
                        onClick={() => setViewData(person)} // Passing the full data to view
                        style={{ cursor: 'pointer', color: 'blue', margin: '0 5px' }}
                      />
                      {/* Edit Icon */}
                      <FaEdit
                        size={20}
                        className="action-icon edit-icon"
                        title="Edit"
                        onClick={() => handleEdit(index)}
                        style={{ cursor: 'pointer', color: 'orange', margin: '0 5px' }}
                      />
                      {/* Delete Icon */}
                      <FaTrashAlt
                        size={20}
                        className="action-icon delete-icon"
                        title="Delete"
                        onClick={() => handleDelete(index)}
                        style={{ cursor: 'pointer', color: 'red', margin: '0 5px' }}
                      />
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
      ) : (
        <div>No Data Available</div>
      )}
    </div>
  );
};

export default TablePage;
