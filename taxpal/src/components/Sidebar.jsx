import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col justify-between min-h-screen p-6">

      <div>
        <h2 className="text-2xl font-bold mb-10 text-blue-600">TaxPal</h2>

        <nav className="space-y-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-600"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-600"
              }`
            }
          >
            Transactions
          </NavLink>

          <div className="text-gray-600 px-4 py-2">Budgets</div>
          <div className="text-gray-600 px-4 py-2">Tax Estimator</div>
          <div className="text-gray-600 px-4 py-2">Reports</div>
        </nav>
      </div>

      {/* User Profile + Logout Bottom */}
      <div className="border-t pt-4 space-y-3">
        <div>
          <p className="font-semibold">{user?.name || "User"}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors font-medium text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>

    </div>
  );
}