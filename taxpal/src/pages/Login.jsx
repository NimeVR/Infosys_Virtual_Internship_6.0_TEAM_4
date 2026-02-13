import { Link } from 'react-router-dom';
import { logo } from '../assets/assets';




export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">

        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="TaxPal Logo" className="w-16 h-16 mb-4 shadow-md rounded-2xl" />

          <h1 className="text-3xl font-semibold mb-1 text-gray-900">TaxPal</h1>
          <p className="text-gray-500">Sign in to manage your finances</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <form className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-blue-500
                focus:border-transparent bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-blue-500
                focus:border-transparent bg-gray-50"
              />
              <div className="text-right mt-2">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold
              shadow-md hover:bg-blue-700 transition-all duration-200">
              Sign In
            </button>

            <p className="text-center text-sm text-gray-600 pt-2">
              Don't have an account?
              <Link to="/signup" className="ml-1 text-blue-600 font-medium hover:text-blue-700">
                Sign up
              </Link>
            </p>

          </form>
        </div>

      </div>
    </div>
  );
}
