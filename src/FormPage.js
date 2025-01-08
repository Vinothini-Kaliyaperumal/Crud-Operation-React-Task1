import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FormPage.css';

const FormPage = ({ data, setData, editData, setEditData }) => {
  const navigate = useNavigate();

  const countries = {
    India: {
      states: ['Tamil Nadu', 'Maharashtra', 'Karnataka'],
      cities: {
        'Tamil Nadu': ['Chennai', 'Coimbatore'],
        'Maharashtra': ['Mumbai', 'Pune'],
        'Karnataka': ['Bangalore', 'Mysore'],
      },
    },
    USA: {
      states: ['California', 'Texas', 'New York'],
      cities: {
        'California': ['Los Angeles', 'San Francisco'],
        'Texas': ['Houston', 'Dallas'],
        'New York': ['New York City', 'Buffalo'],
      },
    },
  };

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

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
      email: Yup.string().email('Invalid email format').required('Email address is required.'),
      dob: Yup.date().required('Date of birth is required.'),
      address: Yup.string().required('Please provide an address.'),
      address2: Yup.string().required('Please provide a second address.'),
      city: Yup.string().required('Please select a city.'),
      state: Yup.string().required('Please select a state.'),
      country: Yup.string().required('Please select a country.'),
      status: Yup.string().required('Please select a status.'),
    }),
    onSubmit: async (values) => {
      try {
        if (editData !== null) {
          const updatedData = [...data];
          updatedData[editData] = values;
          setData(updatedData);  // Update the data array
          setEditData(null);  // Reset edit mode
          toast.success('Updated successfully!');  // Success message
        } else {
          setData([...data, values]);  // Add new entry to data
          toast.success('Submitted successfully!');  // Success message
        }

        formik.resetForm();  // Reset the form

        // Delay the navigation to allow the toast to appear
        setTimeout(() => {
          navigate('/table');  // Navigate to TablePage after toast
        }, 2000);  // Wait for 2 seconds (you can adjust this time)
      } catch (error) {
        toast.error('Submission failed! Please try again.');  // Error message
      }
    },
  });

  useEffect(() => {
    if (editData !== null) {
      formik.setValues(data[editData]);
    }
  }, [editData]);

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    formik.setFieldValue('country', selectedCountry);
    setStates(countries[selectedCountry]?.states || []);
    setCities([]);
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    formik.setFieldValue('state', selectedState);
    setCities(countries[formik.values.country]?.cities[selectedState] || []);
  };

  return (
    <div className="form-container">
      <h1 className="form-heading">Form Page</h1>
      <form onSubmit={formik.handleSubmit}>
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
                placeholder={`Enter ${field === 'name' ? 'full name' : 'short name'}`}
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
                placeholder={`Enter ${field === 'email' ? 'email' : 'date of birth'}`}
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
                placeholder={`Enter ${field === 'address' ? 'address' : 'address 2'}`}
              />
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
              onChange={handleCountryChange}
              onBlur={formik.handleBlur}
              className="select-input"
            >
              <option value="">Select Country</option>
              {Object.keys(countries).map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            {formik.touched.country && formik.errors.country && (
              <div className="error">{formik.errors.country}</div>
            )}
          </div>

          <div className="dropdown-group">
            <label className="input-label">STATE</label>
            <select
              name="state"
              value={formik.values.state}
              onChange={handleStateChange}
              onBlur={formik.handleBlur}
              className="select-input"
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {formik.touched.state && formik.errors.state && (
              <div className="error">{formik.errors.state}</div>
            )}
          </div>
        </div>

        <div className="dropdown-row">
          <div className="dropdown-group">
            <label className="input-label">CITY</label>
            <select
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="select-input"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {formik.touched.city && formik.errors.city && (
              <div className="error">{formik.errors.city}</div>
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

      <ToastContainer />
    </div>
  );
};

export default FormPage;
