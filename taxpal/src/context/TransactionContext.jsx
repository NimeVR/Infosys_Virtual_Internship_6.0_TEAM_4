// @refresh reset
import { createContext, useContext, useState } from "react";

const CURRENCY_MAP = {
  "India": { code: "INR", locale: "en-IN", symbol: "₹" },
  "UK":    { code: "GBP", locale: "en-GB", symbol: "£" },
  "USA":   { code: "USD", locale: "en-US", symbol: "$" },
};

function getCurrency() {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const country = user?.country || "India";
    return CURRENCY_MAP[country] || CURRENCY_MAP["India"];
  } catch {
    return CURRENCY_MAP["India"];
  }
}

const TransactionContext = createContext(null);

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([
    { id: 1, type: "income",  amount: 120000, category: "Consulting", description: "Q1 Project",     date: "2026-01-15" },
    { id: 2, type: "expense", amount: 32000,  category: "Business",   description: "Office Supplies", date: "2026-01-22" },
    { id: 3, type: "income",  amount: 45000,  category: "Freelance",  description: "Design Work",     date: "2026-02-05" },
    { id: 4, type: "expense", amount: 8500,   category: "Transport",  description: "Travel",          date: "2026-02-10" },
  ]);

  const currency = getCurrency();

  const fmt = (n) =>
    new Intl.NumberFormat(currency.locale, {
      style: "currency",
      currency: currency.code,
      maximumFractionDigits: 0,
    }).format(Number(n));

  const addTransaction    = tx => setTransactions(prev => [tx, ...prev]);
  const deleteTransaction = id => setTransactions(prev => prev.filter(t => t.id !== id));

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, deleteTransaction, fmt, currency }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionContext);
}
