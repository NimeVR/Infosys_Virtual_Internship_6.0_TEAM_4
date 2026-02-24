import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/budgets", label: "Budgets" },
    { path: "/transactions", label: "Transactions" },
    { path: "/settings/categories", label: "Categories" },
    { path: "/tax-estimator", label: "Tax Estimator" },  // fixed
    { path: "#", label: "Reports" },
  ];

  return (
    <div className="w-64 bg-white shadow-lg p-6 hidden md:block border-r border-gray-200">
      <Link to="/" className="block">
        <h2 className="text-2xl font-bold mb-10 text-gray-800">TaxPal</h2>
      </Link>

      <ul className="space-y-6 text-gray-600">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const content = (
            <span
              className={`block hover:translate-x-1 transition-all ${
                isActive
                  ? "text-purple-600 font-semibold"
                  : "hover:text-purple-600"
              }`}
            >
              {item.label}
            </span>
          );
          return (
            <li key={item.label} className="cursor-pointer">
              {item.path !== "#" ? <Link to={item.path}>{content}</Link> : content}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
