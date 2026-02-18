import { Link } from 'react-router-dom';
import { logo } from '../assets/assets';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 lg:px-16 xl:px-24 py-5 bg-white border-b border-gray-100">
      <Link to="/" className="flex items-center gap-2.5">
        <img src={logo} alt="TaxPal Logo" className="w-10 h-10" />
        <span className="text-xl font-semibold text-gray-900">TaxPal</span>
      </Link>
      <div className="flex gap-4 items-center">
        <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">Sign in</Link>
        <Link to="/signup" className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Get started</Link>
        <Link to="/dashboard" className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Dashboard</Link>
    
      </div>
    </nav>
  );
}
