import { Link } from 'react-router-dom';
import { logo } from '../assets/assets';

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="TaxPal Logo" className="w-16 h-16 mb-4" />
          <h1 className="text-3xl font-bold mb-2">TaxPal</h1>
          <p className="text-gray-600">Create your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Choose a username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="At least 6 characters"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Re-enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country <span className="text-red-500">*</span>
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Select your country</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Australia</option>
                <option>India</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Income Bracket <span className="text-gray-400">(Optional)</span>
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Prefer not to say</option>
                <option>Under $25,000</option>
                <option>$25,000 - $50,000</option>
                <option>$50,000 - $75,000</option>
                <option>$75,000 - $100,000</option>
                <option>Over $100,000</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Create Account
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
