import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logo } from '../assets/assets';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '', country: '', income_bracket: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 py-12 px-4 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        <div className="hidden lg:flex flex-col justify-center text-white p-12">
          <div className="mb-8">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-3xl inline-block mb-6">
              <img src={logo} alt="TaxPal Logo" className="w-16 h-16 drop-shadow-2xl" />
            </div>
            <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Join TaxPal Today!</h1>
            <p className="text-xl text-white/90 mb-8">Start managing your finances like a pro</p>
          </div>
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">100% Free Forever</h3>
              </div>
              <p className="text-white/80 text-sm">No hidden fees, no credit card required</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Secure & Private</h3>
              </div>
              <p className="text-white/80 text-sm">Your data is encrypted and protected</p>
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-8 lg:p-10">
          <div className="lg:hidden text-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl inline-block mb-4">
              <img src={logo} alt="Logo" className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          </div>
          
          <div className="hidden lg:block mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Get started with your free account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input type="text" name="name" onChange={handleChange} placeholder="John Doe" className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-lg ${errors.name ? 'border-red-400' : 'border-blue-200 focus:border-blue-500'} focus:outline-none transition-all`} />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><span>⚠</span>{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input type="email" name="email" onChange={handleChange} placeholder="you@example.com" className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-lg ${errors.email ? 'border-red-400' : 'border-blue-200 focus:border-blue-500'} focus:outline-none transition-all`} />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><span>⚠</span>{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input type="password" name="password" onChange={handleChange} placeholder="••••••••" className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-lg ${errors.password ? 'border-red-400' : 'border-blue-200 focus:border-blue-500'} focus:outline-none transition-all`} />
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><span>⚠</span>{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <input type="password" name="confirmPassword" onChange={handleChange} placeholder="••••••••" className="w-full pl-10 pr-4 py-2.5 border-2 rounded-lg border-blue-200 focus:border-blue-500 focus:outline-none transition-all" />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><span>⚠</span>{errors.confirmPassword}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Country</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <select name="country" onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 border-2 rounded-lg border-blue-200 focus:border-blue-500 focus:outline-none transition-all appearance-none bg-white">
                  <option value="">Select Country</option>
                  <option value="USA">United States</option>
                  <option value="India">India</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Income Bracket <span className="text-gray-500 text-xs">(Optional)</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <select name="income_bracket" onChange={handleChange} value={formData.income_bracket} className="w-full pl-10 pr-4 py-2.5 border-2 rounded-lg border-blue-200 focus:border-blue-500 focus:outline-none transition-all appearance-none bg-white">
                  <option value="">Select Income Bracket</option>
                  {formData.country === 'USA' && (
                    <>
                      <option value="0-25k">$0 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-75k">$50,000 - $75,000</option>
                      <option value="75k-100k">$75,000 - $100,000</option>
                      <option value="100k+">$100,000+</option>
                    </>
                  )}
                  {formData.country === 'India' && (
                    <>
                      <option value="0-5L">₹0 - ₹5 Lakhs</option>
                      <option value="5L-10L">₹5 - ₹10 Lakhs</option>
                      <option value="10L-20L">₹10 - ₹20 Lakhs</option>
                      <option value="20L-50L">₹20 - ₹50 Lakhs</option>
                      <option value="50L+">₹50 Lakhs+</option>
                    </>
                  )}
                  {formData.country === 'UK' && (
                    <>
                      <option value="0-20k">£0 - £20,000</option>
                      <option value="20k-40k">£20,000 - £40,000</option>
                      <option value="40k-60k">£40,000 - £60,000</option>
                      <option value="60k-80k">£60,000 - £80,000</option>
                      <option value="80k+">£80,000+</option>
                    </>
                  )}
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2">
              Create Account
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            <p className="text-center text-sm text-gray-600 pt-2">
              Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700 hover:underline">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}