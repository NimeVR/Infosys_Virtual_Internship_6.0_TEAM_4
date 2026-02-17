export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg p-6 hidden md:block border-r border-gray-200">
      <h2 className="text-2xl font-bold mb-10 text-gray-800">TaxPal</h2>

      <ul className="space-y-6 text-gray-600">
        <li className="text-blue-600 font-semibold cursor-pointer">
          Dashboard
        </li>

        <li className="hover:text-blue-600 hover:translate-x-1 transition-all cursor-pointer">
          Transactions
        </li>

        <li className="hover:text-blue-600 hover:translate-x-1 transition-all cursor-pointer">
          Budgets
        </li>

        <li className="hover:text-blue-600 hover:translate-x-1 transition-all cursor-pointer">
          Tax Estimator
        </li>

        <li className="hover:text-blue-600 hover:translate-x-1 transition-all cursor-pointer">
          Reports
        </li>
      </ul>
    </div>
  );
}
