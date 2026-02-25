import { useState } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import TransactionsTable from "../components/TransactionsTable";

const inr = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

export default function Dashboard() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "income",
      amount: 120,
      category: "Consulting",
      description: "Design Project",
      date: "2026-02-17",
    },
    {
      id: 2,
      type: "expense",
      amount: 50,
      category: "Business",
      description: "Software Subscription",
      date: "2026-02-15",
    },
  ]);

  const incomeCategories = [
    "Freelance",
    "Consulting",
    "Salary",
    "Investments",
    "Other Income",
  ];

  const expenseCategories = [
    "Business",
    "Software",
    "Rent",
    "Utilities",
    "Marketing",
    "Food",
    "Other Expense",
  ];

  const [formData, setFormData] = useState({
    type: "income",
    amount: "",
    category: incomeCategories[0],
    description: "",
    date: "",
  });

  const [budget, setBudget] = useState(1000);

  // Monthly Filtering
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyTransactions = transactions.filter((t) => {
    const d = new Date(t.date);
    if (isNaN(d.getTime())) return false;
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const monthlyIncome = monthlyTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const monthlyExpense = monthlyTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const estimatedTax = monthlyIncome * 0.25;

  const savingsRate =
    monthlyIncome > 0
      ? (((monthlyIncome - monthlyExpense) / monthlyIncome) * 100).toFixed(1)
      : 0;

  const budgetUsedPercentage =
    budget > 0 ? ((monthlyExpense / budget) * 100).toFixed(1) : 0;

  const categoryOptions =
    formData.type === "income" ? incomeCategories : expenseCategories;

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "type") {
      setFormData((prev) => ({
        ...prev,
        type: value,
        category:
          value === "income" ? incomeCategories[0] : expenseCategories[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Add Transaction
  const handleAddTransaction = (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.date) {
      alert("Please fill required fields");
      return;
    }

    const amount = Number(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      ...formData,
      amount,
    };

    setTransactions((prev) => [newTransaction, ...prev]);

    setFormData({
      type: "income",
      amount: "",
      category: incomeCategories[0],
      description: "",
      date: "",
    });
  };

  // Delete Transaction
  const handleDeleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Overview of your monthly income, expenses, tax, and savings.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Monthly Income"
            value={inr(monthlyIncome)}
            color="green"
          />
          <StatCard
            title="Monthly Expense"
            value={inr(monthlyExpense)}
            color="red"
          />
          <StatCard
            title="Estimated Tax"
            value={inr(estimatedTax)}
            color="yellow"
          />
          <StatCard
            title="Savings Rate"
            value={`${savingsRate}%`}
            color="blue"
          />
        </div>

        {/* Budget Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-1">
            Monthly Budget
          </h2>
          <p className="text-xs text-gray-400 mb-4">
            Compare this month&apos;s spending against your planned budget.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Budget:</span>
              <input
                type="number"
                min="1"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value) || 0)}
                className="border border-purple-100 bg-purple-50 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />
            </div>
            <span className="text-sm text-gray-600">
              Spent: <span className="font-semibold">{inr(monthlyExpense)}</span>{" "}
              / {inr(budget)}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className={`h-4 rounded-full ${
                budgetUsedPercentage > 100
                  ? "bg-rose-500"
                  : "bg-gradient-to-r from-purple-500 to-pink-500"
              }`}
              style={{ width: `${Math.min(budgetUsedPercentage, 100)}%` }}
            />
          </div>

          <p className="mt-2 text-xs text-gray-500">
            {budgetUsedPercentage}% of budget used
          </p>
        </div>

        {/* Add Transaction Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-1">
            Add Transaction
          </h2>
          <p className="text-xs text-gray-400 mb-5">
            Log a new income or expense entry.
          </p>

          <form
            onSubmit={handleAddTransaction}
            className="grid md:grid-cols-6 gap-4"
          >
            {/* Type */}
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-purple-50 border border-purple-100 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            {/* Amount */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                ₹
              </span>
              <input
                type="number"
                name="amount"
                min="1"
                placeholder="0"
                value={formData.amount}
                onChange={handleChange}
                className="w-full bg-purple-50 border border-purple-100 rounded-xl px-8 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />
            </div>

            {/* Category */}
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-purple-50 border border-purple-100 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            >
              {categoryOptions.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Description */}
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-purple-50 border border-purple-100 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />

            {/* Date */}
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-purple-50 border border-purple-100 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />

            {/* Button */}
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl px-4 py-2.5 text-sm font-semibold hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-200 hover:-translate-y-0.5 transition-all"
            >
              Add
            </button>
          </form>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-purple-50">
            <h2 className="text-lg font-bold text-gray-900">
              Recent Transactions
            </h2>
          </div>

          <TransactionsTable
            transactions={transactions}
            onDelete={handleDeleteTransaction}
          />
        </div>
      </div>
    </div>
  );
}

