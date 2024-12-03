import { useState, useEffect, useRef } from "react";
import { z } from "zod";
import IntlTelInput from "intl-tel-input/reactWithUtils";
import "intl-tel-input/build/css/intlTelInput.css";
import "./form.css";

// Schema validation with Zod
const formSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  second_name: z.string().min(1, "Second name is required"),
  address: z.string().min(1, "Address is required"),
  post_code: z.string().regex(/^\d+$/, "Post code must be numeric"),
  city: z.string().min(1, "City is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
});

// Initial form parameters
const initialParams = {
  first_name: "",
  second_name: "",
  address: "",
  post_code: "",
  city: "",
  phone: "",
  email: "",
};

const FormPage = () => {
  const [formData, setFormData] = useState(initialParams);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [, setIsValid] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [errors, setErrors] = useState({});
  const phoneInputRef = useRef(null); // Ref for IntlTelInput

  // Load data from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFormData({
      first_name: params.get("first_name") || "",
      second_name: params.get("second_name") || "",
      address: params.get("address") || "",
      post_code: params.get("post_code") || "",
      city: params.get("city") || "",
      email: params.get("email") || "",
    });
    const phoneParam = params.get("phone") || "";
    setPhoneNumber(phoneParam);

    // Set phone number in IntlTelInput after component mounts
    if (phoneInputRef.current) {
      phoneInputRef.current.getInstance().setNumber(phoneParam);
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFocus = (e) => {
    setFocusedField(e.target.name);
  };

  const handleBlur = () => {
    setFocusedField("");
  };

  // Form submission
  const onSubmit = (e) => {
    e.preventDefault();
    const formWithPhone = { ...formData, phone: phoneNumber };
    const validationResult = formSchema.safeParse(formWithPhone);

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.formErrors.fieldErrors;
      setErrors(fieldErrors);
    } else {
      handleSubmit(formWithPhone);
    }
  };

  const handleSubmit = (data) => {
    const params = new URLSearchParams(window.location.search);
    Object.keys(data).forEach((key) => params.set(key, data[key]));
    const redirectURL = `https://site2.com/?${params.toString()}`;
    window.location.href = redirectURL;
  };

  return (
    <form className="form-class" onSubmit={onSubmit}>
      <h2 className="form-header">Please enter your information</h2>
      <div className="form-container">
        {[
          "first_name",
          "second_name",
          "address",
          "post_code",
          "city",
          "email",
        ].map((field) => (
          <div key={field} className="form-input-container">
            <input
              className={`form-input ${errors[field] ? "error-input" : ""}`}
              type={field === "email" ? "email" : "text"}
              name={field}
              id={field}
              value={formData[field]}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <label
              htmlFor={field}
              className={`form-label ${focusedField === field || formData[field] ? "active" : ""}`}
            >
              {field.replace("_", " ").charAt(0).toUpperCase() +
                field.replace("_", " ").slice(1)}
            </label>
            {errors[field] && (
              <div className="error-message">{errors[field]}</div>
            )}
          </div>
        ))}
        <div className="form-input-container intl-input-wrapper">
          <IntlTelInput
            ref={phoneInputRef} // Attach ref to access instance methods
            onChangeNumber={(number) => setPhoneNumber(number)}
            onChangeValidity={(valid) => setIsValid(valid)}
            initOptions={{
              initialCountry: "de",
              separateDialCode: true,
            }}
          />
          <label htmlFor="phone" className="intel-label">
            Mobile Number
          </label>
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>
        <button className="form-button" type="submit">
          FURTHER
        </button>
      </div>
    </form>
  );
};

export default FormPage;
