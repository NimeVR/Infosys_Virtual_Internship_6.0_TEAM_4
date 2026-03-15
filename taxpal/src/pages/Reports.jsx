import Sidebar from "../components/Sidebar";
import { useTaxPayments } from "../context/TaxPaymentContext";

const inr = (n) => `₹${Number(n).toLocaleString("en-IN")}`;
const usd = (n) => `$${Number(n).toLocaleString("en-US")}`;

export default function Reports() {
  const { taxPayments } = useTaxPayments();

  const totalPaid = taxPayments.reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Tax Reports
            </span>
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            View your recorded tax payments and financial summaries.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl px-6 py-4 border border-purple-100 shadow-sm">
            <p className="text-sm text-gray-400 font-medium">Total Payments Recorded</p>
            <p className="text-2xl font-extrabold text-purple-600">{taxPayments.length}</p>
          </div>
          <div className="bg-white rounded-2xl px-6 py-4 border border-purple-100 shadow-sm">
            <p className="text-sm text-gray-400 font-medium">Total Amount Paid</p>
            <p className="text-2xl font-extrabold text-green-600">{inr(totalPaid)}</p>
          </div>
          <div className="bg-white rounded-2xl px-6 py-4 border border-purple-100 shadow-sm">
            <p className="text-sm text-gray-400 font-medium">Latest Payment</p>
            <p className="text-2xl font-extrabold text-blue-600">
              {taxPayments.length > 0 ? new Date(taxPayments[0].date).toLocaleDateString() : "None"}
            </p>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Tax Payment History</h2>
          {taxPayments.length === 0 ? (
            <p className="text-gray-500">No tax payments recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-purple-100">
                    <th className="text-left py-2 font-semibold text-gray-600">Quarter</th>
                    <th className="text-left py-2 font-semibold text-gray-600">Country</th>
                    <th className="text-left py-2 font-semibold text-gray-600">Amount</th>
                    <th className="text-left py-2 font-semibold text-gray-600">Date</th>
                    <th className="text-left py-2 font-semibold text-gray-600">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {taxPayments.map((payment) => (
                    <tr key={payment.id} className="border-b border-purple-50">
                      <td className="py-3 text-gray-800">{payment.quarter}</td>
                      <td className="py-3 text-gray-800 capitalize">{payment.country}</td>
                      <td className="py-3 text-gray-800 font-semibold">
                        {payment.country === "india" ? inr(payment.amount) : usd(payment.amount)}
                      </td>
                      <td className="py-3 text-gray-800">
                        {new Date(payment.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 text-gray-800">{payment.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}