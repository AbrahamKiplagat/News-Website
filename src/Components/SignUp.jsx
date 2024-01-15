import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/register", formData);

      console.log("Registration successful:", response.data);

      toast.success("Registration successful!");

      handleSignupSuccess(response.data);
    } catch (error) {
      console.error("Registration failed:", error.message);

      toast.error("Registration failed. Please try again.");
    }
  };

  const handleSignupSuccess = (tokens) => {
    sessionStorage.setItem("access_token", tokens.accessToken);
    sessionStorage.setItem("refresh_token", tokens.refreshToken);

    window.location.href = "http://localhost:5173/";
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="signup-form col-md-6">
        <h1 className="text-center mb-4">Sign Up</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Sign Up
          </Button>
        </Form>

        <p className="mt-3 text-center">
          Already have an account? <Link to="/login" className="btn btn-link signup-link">
    Log in
  </Link></p>

        <ToastContainer />
      </div>
    </div>
  );
}

export default SignUp;
