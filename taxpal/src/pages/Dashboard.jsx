import { useState } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import TransactionsTable from "../components/TransactionsTable";

export default function Dashboard() {

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "income",
      amount: 120,
      category: "Consulting",
      description: "Design Project",
      date: "2026-02-17"
    },
    {
      id: 2,
      type: "expense",
      amount: 50,
      category: "Business",
      description: "Software Subscription",
      date: "2026-02-15"
    }
  ]);

  const incomeCategories = [
    "Freelance",
    "Consulting",
    "Salary",
    "Investments",
    "Other Income"
  ];

  const expenseCategories = [
    "Business",
    "Software",
    "Rent",
    "Utilities",
    "Marketing",
    "Food",
    "Other Expense"
  ];

  const [formData, setFormData] = useState({
    type: "income",
    amount: "",
    category: incomeCategories[0],
    description: "",
    date: ""
  });

  const [budget, setBudget] = useState(1000);

  // Monthly Filtering
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyTransactions = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const monthlyIncome = monthlyTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const monthlyExpense = monthlyTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const estimatedTax = monthlyIncome * 0.25;

  const savingsRate =
    monthlyIncome > 0
      ? (((monthlyIncome - monthlyExpense) / monthlyIncome) * 100).toFixed(1)
      : 0;

  const budgetUsedPercentage =
    budget > 0
      ? ((monthlyExpense / budget) * 100).toFixed(1)
      : 0;

  const categoryOptions =
    formData.type === "income"
      ? incomeCategories
      : expenseCategories;

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "type") {
      setFormData({
        ...formData,
        type: value,
        category:
          value === "income"
            ? incomeCategories[0]
            : expenseCategories[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Add Transaction
  const handleAddTransaction = (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.date) {
      alert("Please fill required fields");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      ...formData
    };

    setTransactions([newTransaction, ...transactions]);

    setFormData({
      type: "income",
      amount: "",
      category: incomeCategories[0],
      description: "",
      date: ""
    });
  };

  // Delete Transaction
  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Monthly Income" value={`$${monthlyIncome}`} color="green" />
          <StatCard title="Monthly Expense" value={`$${monthlyExpense}`} color="red" />
          <StatCard title="Estimated Tax" value={`$${estimatedTax}`} color="yellow" />
          <StatCard title="Savings Rate" value={`${savingsRate}%`} color="blue" />
        </div>

        {/* Budget */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold mb-4">Monthly Budget</h2>

          <div className="flex items-center gap-4 mb-4">
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="border rounded-lg p-2 w-40"
            />
            <span className="text-gray-600">
              Spent: ${monthlyExpense} / ${budget}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`h-4 rounded-full ${
                budgetUsedPercentage > 100 ? "bg-red-500" : "bg-blue-600"
              }`}
              style={{ width: `${Math.min(budgetUsedPercentage, 100)}%` }}
            ></div>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            {budgetUsedPercentage}% of budget used
          </p>
        </div>

        {/* Add Transaction */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>

          <form onSubmit={handleAddTransaction} className="grid md:grid-cols-6 gap-4">

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border rounded-lg p-2"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              className="border rounded-lg p-2"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border rounded-lg p-2"
            >
              {categoryOptions.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border rounded-lg p-2"
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border rounded-lg p-2"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
            >
              Add
            </button>

          </form>
        </div>

        <TransactionsTable
          transactions={transactions}
          onDelete={handleDeleteTransaction}
        />
      </div>
    </div>
  );
}
