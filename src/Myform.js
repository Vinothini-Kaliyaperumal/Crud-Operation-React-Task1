import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const MyForm = () => {
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    gender: Yup.string().required("Gender is required"),
    dob: Yup.date().required("Date of Birth is required"),
  });

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);

  const handleSubmit = (values, { resetForm }) => {
    if (editingIndex !== null) {
      const updatedData = [...data];
      updatedData[editingIndex] = values;
      setData(updatedData);
      setEditingIndex(null);
    } else {
      setData([...data, values]);
    }
    resetForm();
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const filteredData = data.filter((_, i) => i !== index);
    setData(filteredData);
  };

  const handleView = (person) => {
    setSelectedPerson(person);
    setIsModalOpen(true); // Open the modal when View button is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedPerson(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Formik
        initialValues={
          editingIndex !== null
            ? data[editingIndex]
            : {
                name: "",
                email: "",
                phone: "",
                address: "",
                gender: "",
                dob: "",
              }
        }
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ resetForm }) => (
          <Form>
            <div>
              <label>Name:</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <label>Email:</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label>Phone:</label>
              <Field type="text" name="phone" />
              <ErrorMessage name="phone" component="div" />
            </div>
            <div>
              <label>Address:</label>
              <Field type="text" name="address" />
              <ErrorMessage name="address" component="div" />
            </div>
            <div>
              <label>Gender:</label>
              <Field as="select" name="gender">
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Field>
              <ErrorMessage name="gender" component="div" />
            </div>
            <div>
              <label>Date of Birth:</label>
              <Field type="date" name="dob" />
              <ErrorMessage name="dob" component="div" />
            </div>
            <div>
              <button type="submit">
                {editingIndex !== null ? "Update" : "Submit"}
              </button>
              <button type="button" onClick={() => resetForm()}>
                Reset
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div>
        <h2>Search</h2>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div>
        <h2>Stored Data</h2>
        <table border="1" width="100%">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="7">No data found</td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>{item.gender}</td>
                  <td>{item.dob}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                    <button onClick={() => handleView(item)}>View</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h2>Selected Person's Details</h2>
            <pre>{JSON.stringify(selectedPerson, null, 2)}</pre>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};

export default MyForm;
