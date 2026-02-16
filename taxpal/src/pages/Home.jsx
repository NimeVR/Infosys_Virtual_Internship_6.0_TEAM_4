import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { card } from '../assets/assets';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
        <div className="flex items-center px-8 lg:px-16 xl:px-24 py-12">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 leading-[1.1] text-black">
              Tax management for freelancers
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
              Track income, manage expenses, and estimate quarterly taxes—all in one simple platform built for gig workers and freelancers.
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <Link to="/signup" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium inline-flex items-center gap-2">
                Get started free
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link to="/login" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                Sign in
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              Free to use • No credit card required
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center p-8">
          <div className="w-3/4 h-3/4 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={card} 
              alt="Freelancer" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
