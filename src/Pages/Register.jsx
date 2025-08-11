// // Register.jsx
// import React, { useState } from "react";
// import { Form, Button, Card, Container } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import './Register.css';
// import axios from "axios"; 


// function Register() {

//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     mobileCode:"",
//     mobileIsoCode: "",
//     mobile: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//     const response =  await axios.post(`https://store.findtutorhub.com/v1/seller/phone-number/sign-up`, formData); 
//     console.log("Registration successful:", response.data);


//     navigate("/login");
//   } catch (error) { //539857
//     console.error("Registration failed:", error);
//     alert("Registration failed. Please try again.");
//   }
//     localStorage.setItem("user", JSON.stringify(formData));
//     navigate("/login");
//   };

//   return (
//     <div className="register-wrapper">
//       <Container className="register-container">
//         <Card className="register-card shadow-lg">
//           <h3 className="register-title">📝 Create Your Account</h3>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-4">
//               <Form.Label>Mobile code</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="mobileCode"
//                 value={formData.mobileCode}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your mobile code"
//               />
//             </Form.Group>
//             <Form.Group className="mb-4">
//               <Form.Label>Mobile IScode</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="mobileIsoCode"
//                 value={formData.mobileIsoCode}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your mobile Iscode"
//               />
//             </Form.Group>

//             <Form.Group className="mb-4">
//               <Form.Label>Mobile</Form.Label>
//               <Form.Control
//                 type="mobile"
//                 name="mobile"
//                 value={formData.mobile}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your Mobile no"
//               />
//             </Form.Group>

//             <Form.Group className="mb-4">
//               <Form.Label>🔒 Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 placeholder="Create a password"
//               />
//             </Form.Group>

//             <Button type="submit" className="register-button">
//               Register
//             </Button>
//           </Form>

//           <p className="register-footer">
//             Already have an account?{" "}
//             <span className="login-link" onClick={() => navigate("/login")}>
//               Login here
//             </span>
//           </p>
//         </Card>
//       </Container>
//     </div>
//   );
// }

// export default Register;


import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { parsePhoneNumber } from "libphonenumber-js";
import API from "./api";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState(""); // Add this line near the top

  const [formData, setFormData] = useState({
    mobileCode: "",
    mobileIsoCode: "",
    mobile: "",
    password: "",
  });

  const handlePhoneChange = (value) => {
    if (!value) return;

    try {
      const parsedNumber = parsePhoneNumber(value);
      setFormData((prev) => ({
        ...prev,
        mobile: value,
        mobileIsoCode: parsedNumber.country || "",
        mobileCode: `+${parsedNumber.countryCallingCode}` || "",
      }));
    } catch (err) {
      setFormData((prev) => ({
        ...prev,
        mobile: value,
        mobileIsoCode: "",
        mobileCode: "",
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);

    try {
      const res = await API.post('/auth/register', formData);
      setMsg(res.data);
      navigate('/login');
    } catch (err) {
      setMsg(err.response?.data?.errors || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-wrapper">
      <Container className="register-container">
        <Card className="register-card shadow-lg">
          <h3 className="register-title">📝 Create Your Account</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label>📱 Mobile Number</Form.Label>
              <PhoneInput
                defaultCountry="IN"
                value={formData.mobile}
                onChange={handlePhoneChange}
                required
                className="form-control"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>🔒 Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a password"
              />
            </Form.Group>

            <Button type="submit" className="register-button">
              Register
            </Button>
          </Form>

          <p className="register-footer">
            Already have an account?{" "}
            <span className="login-link" onClick={() => navigate("/login")}>
              Login here
            </span>
          </p>
        </Card>
      </Container>
    </div>
  );
}

export default Register;
