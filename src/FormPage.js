import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './FormPage.css';

const FormPage = ({ data, setData, editData, setEditData }) => {
  const navigate = useNavigate();

  const cities = ['Chennai', 'Mumbai', 'Bangalore', 'Delhi'];
  const states = ['Tamil Nadu', 'Maharashtra', 'Karnataka', 'Delhi'];
  const countries = ['India', 'USA', 'Canada', 'UK'];

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
      name: Yup.string().required('Required'),
      shortName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      dob: Yup.date().required('Required'),
      address: Yup.string().required('Required'),
      address2: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      state: Yup.string().required('Required'),
      country: Yup.string().required('Required'),
      status: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      if (editData !== null) {
        const updatedData = [...data];
        updatedData[editData] = values;
        setData(updatedData);
        setEditData(null);
      } else {
        setData([...data, values]);
      }
      formik.resetForm();
      navigate('/table');
    },
  });

  useEffect(() => {
    if (editData !== null) {
      formik.setValues(data[editData]);
    }
  }, [editData]);

  return (
    <div className="form-container">
      <h1 className="form-heading">Form Page</h1>
      <form onSubmit={formik.handleSubmit}>
        {/* Name, ShortName, Email, DOB, etc. */}
        <div className="input-row">
          {['name', 'shortName'].map((field) => (
            <div key={field} className="input-group">
              <label className="input-label">{field.toUpperCase()}</label>
              <input
                type={field === 'dob' ? 'date' : 'text'}
                name={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="input-field"
              />
              {formik.touched[field] && formik.errors[field] && (
                <div className="error">{formik.errors[field]}</div>
              )}
            </div>
          ))}
        </div>

        <div className="input-row">
          {['email', 'dob'].map((field) => (
            <div key={field} className="input-group">
              <label className="input-label">{field.toUpperCase()}</label>
              <input
                type={field === 'dob' ? 'date' : 'text'}
                name={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="input-field"
              />
              {formik.touched[field] && formik.errors[field] && (
                <div className="error">{formik.errors[field]}</div>
              )}
            </div>
          ))}
        </div>

        <div className="input-row">
          {['address', 'address2'].map((field) => (
            <div key={field} className="input-group">
              <label className="input-label">{field.toUpperCase()}</label>
              <input
                type="text"
                name={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="input-field"
              />
              {formik.touched[field] && formik.errors[field] && (
                <div className="error">{formik.errors[field]}</div>
              )}
            </div>
          ))}
        </div>

        <div className="dropdown-row">
          {['city', 'state'].map((field) => (
            <div key={field} className="dropdown-group">
              <label className="input-label">{field.toUpperCase()}</label>
              <select
                name={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="select-input"
              >
                <option value="">Select {field.charAt(0).toUpperCase() + field.slice(1)}</option>
                {(field === 'city' ? cities : states).map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {formik.touched[field] && formik.errors[field] && (
                <div className="error">{formik.errors[field]}</div>
              )}
            </div>
          ))}
        </div>

        <div className="dropdown-row">
          <div className="dropdown-group">
            <label className="input-label">COUNTRY</label>
            <select
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="select-input"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            {formik.touched.country && formik.errors.country && (
              <div className="error">{formik.errors.country}</div>
            )}
          </div>

          <div className="dropdown-group">
            <label className="input-label">STATUS</label>
            <select
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="select-input"
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
            {formik.touched.status && formik.errors.status && (
              <div className="error">{formik.errors.status}</div>
            )}
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="submit-button">
            {editData !== null ? 'Update' : 'Submit'}
          </button>
          {editData === null && (
            <button type="reset" onClick={formik.handleReset} className="reset-button">
              Reset
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormPage;
