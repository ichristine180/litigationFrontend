import React, { useState } from "react";
const Form = ({ fields, onSubmit, submitButtonText }) => {
  const initialFormState = {};
  const initialValidationState = {};
  fields.forEach((field) => {
    initialFormState[field.name] = field.type === "checkbox" ? false : "";
    initialValidationState[field.name] = "";
  });

  const [formData, setFormData] = useState(initialFormState);
  const [validationErrors, setValidationErrors] = useState(
    initialValidationState
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear validation error when the user starts typing
    setValidationErrors({ ...validationErrors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation before submitting the form
    let isValid = true;
    const updatedValidationErrors = {};

    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        updatedValidationErrors[field.name] = "This field is required.";
        isValid = false;
      }
    });
    if (!isValid) {
      setValidationErrors(updatedValidationErrors);
    } else {
      onSubmit(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ border: "1px solid #ccc", borderRadius: "3%", padding: "15px" }}
    >
      {fields.map((field) => {
        return (
          <div key={field.name} className="mb-3">
            <label htmlFor={field.name} className="form-label">
              {field.label}
            </label>
            {field.type === "text" ||
            field.type === "email" ||
            field.type === "password" ||
            field.type === "number" ? (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className={`form-control ${
                  validationErrors[field.name] ? "is-invalid" : ""
                }`}
                id={field.name}
                required={field.required}
              />
            ) : field.type === "checkbox" ? (
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={field.name}
                  checked={formData[field.name]}
                  onChange={handleChange}
                  id={field.name}
                />
                <label className="form-check-label" htmlFor={field.name}>
                  {field.label}
                </label>
              </div>
            ) : field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className={`form-select ${
                  validationErrors[field.name] ? "is-invalid" : ""
                }`}
                id={field.name}
                required={field.required}
              >
                <option value="">Select an option</option>
                {field.options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) :field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className={`form-select ${
                  validationErrors[field.name] ? "is-invalid" : ""
                }`}
                id={field.name}
                required={field.required}
              >
               
              </textarea>
            ): (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className={`form-control ${
                  validationErrors[field.name] ? "is-invalid" : ""
                }`}
                id={field.name}
                required={field.required}
              />
            )}
            {validationErrors[field.name] && (
              <div className="invalid-feedback">
                {validationErrors[field.name]}
              </div>
            )}
          </div>
        );
      })}
      <button type="submit" className="btn btn-primary">
        {submitButtonText}
      </button>
    </form>
  );
};

export default Form;
