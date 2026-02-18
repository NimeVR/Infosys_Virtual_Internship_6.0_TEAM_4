export default function TransactionsTable({ transactions = [], onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-200">
      <h2 className="text-lg font-semibold mb-6">Recent Transactions</h2>

      <table className="w-full text-left">
        <thead className="bg-gray-50">
          <tr className="text-gray-600 text-sm">
            <th className="py-3">Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="6" className="py-6 text-center text-gray-400">
                No transactions yet
              </td>
            </tr>
          ) : (
            transactions.map((t) => (
              <tr
                key={t.id}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                <td className="py-4">{t.date}</td>
                <td>{t.description}</td>
                <td>{t.category}</td>
                <td className="font-semibold">${t.amount}</td>
                <td
                  className={
                    t.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {t.type}
                </td>
                <td>
                  <button
                    onClick={() => onDelete(t.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
