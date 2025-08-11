// // import React, { useState } from "react";
// // import { Form, Button, Card, Container } from "react-bootstrap";
// // import { useNavigate, Link } from "react-router-dom";
// // import axios from "axios";
// // import './Login.css';

// // function Login() {
// //   const navigate = useNavigate();
// //   const [formData, setFormData] = useState({
// //     mobileCode: "",
// //     mobileIsoCode: "",
// //     mobile: "",
// //     password: "",
// //     otp:""
// //   });
// //   const [otp, setOtp] = useState("");
// //   const [step, setStep] = useState("login"); 
// //   const [error, setError] = useState("");

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleLoginSubmit = async (e) => {
// //     e.preventDefault();
// //     try {

// //       const response = await axios.post(`https://store.findtutorhub.com/v1/auth/phone-number/login`, {
// //         mobile: formData.mobile,
// //         password: formData.password
// //       });

// //       if (response.data.status === "OTP_SENT") {
// //         setStep("otp");
// //         setError("");
// //       } else {
// //         setError("Failed to send OTP");
// //       }
// //     } catch (err) {
// //       setError("Invalid mobile or password");
// //     }
// //   };

// //   const handleOtpSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post(`https://store.findtutorhub.com/v1/auth/phone-number/verify`, {
// //         mobile: formData.mobile,
// //         otp: otp
// //       });

// //       if (response.data.verified) {
// //         navigate("/storeForm");
// //       } else {
// //         setError("Invalid OTP");
// //       }
// //     } catch (err) {
// //       setError("Verification failed");
// //     }
// //   };

// //   return (
// //     <div className="login-wrapper">
// //       <Container className="login-container">
// //         <Card className="login-card">
// //           <h3 className="login-title">🔐 Login to Your Account</h3>

// //           {step === "login" ? (
// //             <Form onSubmit={handleLoginSubmit}>
// //               <Form.Group className="mb-3">
// //                 <Form.Label>Mobile Code</Form.Label>
// //                 <Form.Control
// //                   type="text"
// //                   name="mobileCode"
// //                   value={formData.mobileCode}
// //                   onChange={handleChange}
// //                   required
// //                   placeholder="Enter your mobile code"
// //                 />
// //               </Form.Group>

// //               <Form.Group className="mb-3">
// //                 <Form.Label>Mobile ISO Code</Form.Label>
// //                 <Form.Control
// //                   type="text"
// //                   name="mobileIsoCode"
// //                   value={formData.mobileIsoCode}
// //                   onChange={handleChange}
// //                   required
// //                   placeholder="Enter your mobile ISO code"
// //                 />
// //               </Form.Group>

// //               <Form.Group className="mb-3">
// //                 <Form.Label>Mobile</Form.Label>
// //                 <Form.Control
// //                   type="text"
// //                   name="mobile"
// //                   value={formData.mobile}
// //                   onChange={handleChange}
// //                   required
// //                   placeholder="Enter your mobile number"
// //                 />
// //               </Form.Group>

// //               <Form.Group className="mb-3">
// //                 <Form.Label>Password</Form.Label>
// //                 <Form.Control
// //                   type="password"
// //                   name="password"
// //                   value={formData.password}
// //                   onChange={handleChange}
// //                   required
// //                   placeholder="Enter your password"
// //                 />
// //               </Form.Group>

// //               {error && <p className="error-text">{error}</p>}

// //               <Button type="submit" className="login-button">Send OTP</Button>
// //             </Form>
// //           ) : (
// //             <Form onSubmit={handleOtpSubmit}>
// //               <Form.Group className="mb-4">
// //                 <Form.Label>Enter OTP sent to your mobile</Form.Label>
// //                 <Form.Control
// //                   type="text"
// //                   value={otp}
// //                   onChange={(e) => setOtp(e.target.value)}
// //                   required
// //                   placeholder="Enter OTP"
// //                 />
// //               </Form.Group>

// //               {error && <p className="error-text">{error}</p>}

// //               <Button type="submit" className="login-button">Verify OTP</Button>
// //             </Form>
// //           )}

// //           <p className="login-footer">
// //             Don’t have an account?{" "}
// //             <Link to="/register" className="register-link">
// //               Create one
// //             </Link>
// //           </p>
// //         </Card>
// //       </Container>
// //     </div>
// //   );
// // }

// // export default Login;


// import React, { useState } from "react";
// import 'react-phone-number-input/style.css';
// import API from "./api";
// import { Form, Button, Card, Container } from "react-bootstrap";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import PhoneInput, { getCountryCallingCode, parsePhoneNumber } from "react-phone-number-input";
// import "react-phone-number-input/style.css";
// import './Login.css';

// function Login() {
//   const navigate = useNavigate();
//   const [msg, setMsg] = useState(""); // Add this line near the top
  
//   const [formData, setFormData] = useState({
//     mobile: "",
//     password: ""
//   });
//   const [countryCode, setCountryCode] = useState("IN");
//   const [fullNumber, setFullNumber] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState("login");
//   const [error, setError] = useState("");

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
// try {
//       const res = await API.post('/auth/login', formData);
//       setMsg(res.data);
//       navigate('/storeForm');
//     } catch (err) {
//       setMsg(err.response?.data?.errors || 'Registration failed. Please try again.');
//     }
//   //   try {
      
//   //     const number = parsePhoneNumber(fullNumber);
//   //     const mobileCode = `+${number.countryCallingCode}`;
//   //     const mobileIsoCode = number.country;
//   //     const mobile = number.nationalNumber;

//   //     const response = await axios.post(`https://store.findtutorhub.com/v1/seller/phone-number/login`, {
//   //       mobile,
//   //       password: formData.password,
//   //       mobileCode,
//   //       mobileIsoCode
//   //     });

//   //     if (response.data.status === "OTP_SENT") {
//   //       setStep("otp");
//   //       setError("");
//   //     } else {
//   //       setError("Failed to send OTP");
//   //     }
//   //   } catch (err) {
//   //     setError("Invalid mobile or password");
//   //   }
//   };

//   // const handleOtpSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const response = await axios.post(`https://store.findtutorhub.com//v1/seller/phone-number/verify`, {
//   //       mobile: parsePhoneNumber(fullNumber).nationalNumber,
//   //       otp: otp
//   //     });

//   //     if (response.data.verified) {
//   //       navigate("/storeForm");
//   //     } else {
//   //       setError("Invalid OTP");
//   //     }
//   //   } catch (err) {
//   //     setError("Verification failed");
//   //   }
//   // };

//   return (
//     <div className="login-wrapper">
//       <Container className="login-container">
//         <Card className="login-card">
//           <h3 className="login-title">🔐 Login to Your Account</h3>

//           {/* {step === "login" ? ( */}
//             <Form onSubmit={handleLoginSubmit}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Phone Number</Form.Label>
//                 <PhoneInput
//                   placeholder="Enter phone number"
//                   defaultCountry="IN"
//                   value={fullNumber}
//                   onChange={setFullNumber}
//                   international
//                   className="w-100"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                   required
//                   placeholder="Enter your password"
//                 />
//               </Form.Group>

//               {error && <p className="error-text">{error}</p>}

//               <Button type="submit" className="login-button">Send OTP</Button>
//             </Form>
//           {/* ) : (
//             <Form onSubmit={handleLoginSubmit}>
//               <Form.Group className="mb-4">
//                 <Form.Label>Enter OTP sent to your mobile</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   required
//                   placeholder="Enter OTP"
//                 /> */}
//               {/* </Form.Group>

//               {error && <p className="error-text">{error}</p>}

//               <Button type="submit" className="login-button">Verify OTP</Button>
//             </Form> */}
//           {/* )} */}

//           <p className="login-footer">
//             Don’t have an account?{" "}
//             <Link to="/register" className="register-link">
//               Create one
//             </Link>
//           </p>
//         </Card>
//       </Container>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import 'react-phone-number-input/style.css';
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [fullNumber, setFullNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const number = parsePhoneNumber(fullNumber);
      const mobile = number.nationalNumber; // Send only mobile number

      const payload = {
        mobile,
        password,
      };

      const res = await axios.post("http://localhost:8080/auth/login", payload);
      setMsg("Login successful!");
      setError("");

      // Save token if needed
      localStorage.setItem("token", res.data.token);
      navigate("/storeForm");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
      setMsg("");
    }
  };

  return (
    <div className="login-wrapper">
      <Container className="login-container">
        <Card className="login-card">
          <h3 className="login-title">🔐 Login to Your Account</h3>

          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <PhoneInput
                placeholder="Enter phone number"
                defaultCountry="IN"
                value={fullNumber}
                onChange={setFullNumber}
                international
                required
                className="w-100"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </Form.Group>

            {error && <p className="error-text">{error}</p>}
            {msg && <p className="success-text">{msg}</p>}

            <Button type="submit" className="login-button">
              Login
            </Button>
          </Form>

          <p className="login-footer">
            Don’t have an account?{" "}
            <Link to="/register" className="register-link">
              Create one
            </Link>
          </p>
        </Card>
      </Container>
    </div>
  );
}

export default Login;
