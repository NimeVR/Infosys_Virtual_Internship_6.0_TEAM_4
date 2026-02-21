import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useTransactions } from "../context/TransactionContext";

/* ─── Category config ─────────────────────────────────────────────── */
const INCOME_CATS  = ["Salary", "Consulting", "Freelance", "Business", "Investment", "Other"];
const EXPENSE_CATS = ["Business", "Food", "Transport", "Shopping", "Bills", "Health", "Rent", "Other"];

const CAT_ICON = {
  Salary: "💼", Consulting: "🤝", Freelance: "🖥️", Business: "🏢", Investment: "📈",
  Food: "🍔", Transport: "🚗", Shopping: "🛍️", Bills: "📄", Health: "💊", Rent: "🏠", Other: "📦",
};

const inr = n => `₹${Number(n).toLocaleString("en-IN")}`;

/* ─── Field wrapper ───────────────────────────────────────────────── */
function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-purple-50 border border-purple-100 rounded-xl px-4 py-2.5 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all placeholder-gray-300";

/* ─── Transactions Page ───────────────────────────────────────────── */
export default function Transactions() {
  const { transactions, addTransaction, deleteTransaction } = useTransactions();

  const [form, setForm] = useState({ type: "income", amount: "", category: "Salary", description: "", date: "" });
  const [filter, setFilter] = useState("all");
  const [added, setAdded] = useState(false);

  const cats = form.type === "income" ? INCOME_CATS : EXPENSE_CATS;

  const handleChange = e => {
    const updated = { ...form, [e.target.name]: e.target.value };
    if (e.target.name === "type")
      updated.category = e.target.value === "income" ? INCOME_CATS[0] : EXPENSE_CATS[0];
    setForm(updated);
  };

  const handleAdd = e => {
    e.preventDefault();
    if (!form.amount || Number(form.amount) <= 0) return;
    addTransaction({ id: Date.now(), ...form, amount: Number(form.amount) });
    setForm(f => ({ ...f, amount: "", description: "", date: "" }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const filtered = transactions
    .filter(t => filter === "all" || t.type === filter)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const income  = transactions.filter(t => t.type === "income").reduce((s, t) => s + Number(t.amount), 0);
  const expense = transactions.filter(t => t.type === "expense").reduce((s, t) => s + Number(t.amount), 0);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Transactions
            </span>
          </h1>
          <p className="text-gray-500 mt-1 text-sm">Add transactions — they update the dashboard charts instantly.</p>
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Records", val: transactions.length,            gradient: "from-purple-600 to-pink-600" },
            { label: "Total Income",  val: inr(income),                    gradient: "from-emerald-500 to-teal-500" },
            { label: "Total Expense", val: inr(expense),                   gradient: "from-pink-600 to-rose-500" },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl px-6 py-4 border border-purple-100 shadow-sm flex items-center justify-between">
              <p className="text-sm text-gray-400 font-medium">{s.label}</p>
              <p className={`text-2xl font-extrabold bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent`}>{s.val}</p>
            </div>
          ))}
        </div>

        {/* Add Transaction Form */}
        <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-1">Add New Transaction</h2>
          <p className="text-xs text-gray-400 mb-5">Reflects on the dashboard in real time</p>

          <form onSubmit={handleAdd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Type">
                <select name="type" value={form.type} onChange={handleChange} className={inputCls}>
                  <option value="income">📥 Income</option>
                  <option value="expense">📤 Expense</option>
                </select>
              </Field>

              <Field label="Amount (₹)">
                <input type="number" name="amount" placeholder="0" min="1"
                  value={form.amount} onChange={handleChange} required className={inputCls} />
              </Field>

              <Field label="Category">
                <select name="category" value={form.category} onChange={handleChange} className={inputCls}>
                  {cats.map(c => <option key={c} value={c}>{CAT_ICON[c]} {c}</option>)}
                </select>
              </Field>

              <Field label="Description">
                <input type="text" name="description" placeholder="e.g. Monthly rent"
                  value={form.description} onChange={handleChange} className={inputCls} />
              </Field>

              <Field label="Date">
                <input type="date" name="date" value={form.date} onChange={handleChange} className={inputCls} />
              </Field>

              <Field label="​">
                <button type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-200 hover:-translate-y-0.5 transition-all text-sm">
                  {added ? "✓ Added!" : "+ Add Transaction"}
                </button>
              </Field>
            </div>
          </form>
        </div>

        {/* Filter Tabs + Table */}
        <div className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden">

          {/* Tabs */}
          <div className="flex gap-1 px-5 pt-4 border-b border-purple-50">
            {["all", "income", "expense"].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-t-xl text-sm font-semibold transition-all ${
                  filter === f
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow"
                    : "text-gray-400 hover:text-purple-600"
                }`}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
                {f !== "all" && (
                  <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                    filter === f ? "bg-white/20 text-white" : "bg-purple-50 text-purple-600"
                  }`}>
                    {transactions.filter(t => t.type === f).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Table */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-300">
              <div className="text-5xl mb-3">📭</div>
              <p className="text-sm text-gray-400">No transactions found. Add one above!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full" style={{ tableLayout: "fixed" }}>
                <colgroup>
                  <col style={{ width: "14%" }} />
                  <col style={{ width: "16%" }} />
                  <col style={{ width: "18%" }} />
                  <col style={{ width: "24%" }} />
                  <col style={{ width: "16%" }} />
                  <col style={{ width: "12%" }} />
                </colgroup>
                <thead className="bg-purple-50">
                  <tr>
                    {["Type", "Amount", "Category", "Description", "Date", "Action"].map(h => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-purple-400 uppercase tracking-widest">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((tx, i) => {
                    const isInc = tx.type === "income";
                    return (
                      <tr key={tx.id}
                        className={`hover:bg-purple-50/50 transition-colors ${i < filtered.length - 1 ? "border-b border-purple-50" : ""}`}>
                        {/* Type */}
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
                            isInc ? "bg-purple-100 text-purple-700" : "bg-pink-100 text-pink-700"
                          }`}>
                            {isInc ? "↑" : "↓"} {isInc ? "Income" : "Expense"}
                          </span>
                        </td>
                        {/* Amount */}
                        <td className="px-5 py-4">
                          <span className={`font-extrabold text-sm ${isInc ? "text-emerald-600" : "text-rose-500"}`}>
                            {isInc ? "+" : "−"}{inr(tx.amount)}
                          </span>
                        </td>
                        {/* Category */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-base leading-none">{CAT_ICON[tx.category] || "📦"}</span>
                            <span className="text-sm text-gray-700 font-medium">{tx.category}</span>
                          </div>
                        </td>
                        {/* Description */}
                        <td className="px-5 py-4 text-sm text-gray-400 truncate max-w-0">
                          {tx.description || "—"}
                        </td>
                        {/* Date */}
                        <td className="px-5 py-4 text-sm text-gray-400 whitespace-nowrap">
                          {tx.date
                            ? new Date(tx.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                            : "—"}
                        </td>
                        {/* Action */}
                        <td className="px-5 py-4">
                          <button
                            onClick={() => deleteTransaction(tx.id)}
                            className="text-xs font-semibold text-rose-500 bg-rose-50 hover:bg-rose-100 border border-rose-100 px-3 py-1.5 rounded-lg transition-colors">
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}