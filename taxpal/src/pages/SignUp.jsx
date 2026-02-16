import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logo } from '../assets/assets';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '', country: '', income_bracket: 'Prefer not to say'
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Advanced Validation Logic
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (formData.password.length < 8) newErrors.password = 'Min 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.country) newErrors.country = 'Select a country';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
          alert("Registration Successful!");
          navigate('/login');
        } else {
          alert("Error: " + data.message);
        }
      } catch (error) {
        alert("Server error.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logo} alt="Logo" className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">TaxPal</h1>
          <p className="text-gray-600">Create your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input type="text" name="name" onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" name="email" onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input type="password" name="password" onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg ${errors.password ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input type="password" name="confirmPassword" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg border-gray-300" />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <select name="country" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg border-gray-300">
                <option value="">Select Country</option>
                <option value="USA">United States</option>
                <option value="India">India</option>
                <option value="UK">United Kingdom</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}