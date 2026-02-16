import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logo } from '../assets/assets';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // UI Validation Logic (from teammate)
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    // If no UI errors, talk to Backend
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          alert("Login Successful!");
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/'); 
        } else {
          alert("Login Failed: " + data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Could not connect to server.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="TaxPal Logo" className="w-16 h-16 mb-4 shadow-md rounded-2xl" />
          <h1 className="text-3xl font-semibold mb-1 text-gray-900">TaxPal</h1>
          <p className="text-gray-500">Sign in to manage your finances</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 bg-gray-50 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 bg-gray-50 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'}`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all">
              Sign In
            </button>

            <p className="text-center text-sm text-gray-600 pt-2">
              Don't have an account? <Link to="/signup" className="ml-1 text-blue-600 font-medium hover:text-blue-700">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}