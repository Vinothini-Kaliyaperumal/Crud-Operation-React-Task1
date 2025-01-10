import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const FormPage = ({ data, setData, editData, setEditData }) => {
  const navigate = useNavigate();

  // Custom Toast Function
  const showToast = (message, callback) => {
    toast.success(message, {
      autoClose: 3000, // Matches progress duration
      onClose: callback, // Navigate after toast finishes
      className: 'toast-message',
      progressClassName: 'toast-progress',
    });
  };

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: '',
      shortName: '',
      email: '',
      dob: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      country: '',
      status: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required.'),
      shortName: Yup.string().required('Short name is required.'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email address is required.'),
      dob: Yup.date().required('Date of birth is required.'),
      address: Yup.string().required('Please provide an address.'),
      // address2: Yup.string().required('Please provide a second address.'),
      city: Yup.string().required('Please select a city.'),
      state: Yup.string().required('Please select a state.'),
      country: Yup.string().required('Please select a country.'),
      status: Yup.string().required('Please select a status.'),
    }),
    onSubmit: (values) => {
      if (editData !== null) {
        const updatedData = [...data];
        updatedData[editData] = values;
        setData(updatedData);
        setEditData(null);
        showToast('Updated successfully!', () => navigate('/table'));
      } else {
        setData([...data, values]);
        showToast('Submitted successfully!', () => navigate('/table'));
      }

      formik.resetForm();
    },
  });

  return (
    <div className="form-container">
      <h1 className="form-heading">Form Page</h1>
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="error-text">{formik.errors.name}</p>
          )}
        </div>

        <div className="form-group">
          <label>Short Name</label>
          <input
            type="text"
            name="shortName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.shortName}
          />
          {formik.touched.shortName && formik.errors.shortName && (
            <p className="error-text">{formik.errors.shortName}</p>
          )}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="error-text">{formik.errors.email}</p>
          )}
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dob}
          />
          {formik.touched.dob && formik.errors.dob && (
            <p className="error-text">{formik.errors.dob}</p>
          )}
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
          />
          {formik.touched.address && formik.errors.address && (
            <p className="error-text">{formik.errors.address}</p>
          )}
        </div>

        <div className="form-group">
          <label>Address 2</label>
          <input
            type="text"
            name="address2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address2}
          />
          {formik.touched.address2 && formik.errors.address2 && (
            <p className="error-text">{formik.errors.address2}</p>
          )}
        </div>

        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
          />
          {formik.touched.city && formik.errors.city && (
            <p className="error-text">{formik.errors.city}</p>
          )}
        </div>

        <div className="form-group">
          <label>State</label>
          <input
            type="text"
            name="state"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.state}
          />
          {formik.touched.state && formik.errors.state && (
            <p className="error-text">{formik.errors.state}</p>
          )}
        </div>

        <div className="form-group">
          <label>Country</label>
          <input
            type="text"
            name="country"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.country}
          />
          {formik.touched.country && formik.errors.country && (
            <p className="error-text">{formik.errors.country}</p>
          )}
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.status}
          >
            <option value="">Select status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          {formik.touched.status && formik.errors.status && (
            <p className="error-text">{formik.errors.status}</p>
          )}
        </div>

        <button type="submit">
          {editData !== null ? 'Update' : 'Submit'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default FormPage;
