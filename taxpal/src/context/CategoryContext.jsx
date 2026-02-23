
import { createContext, useContext, useState } from "react";

/* ─── Preset colors for category dots ───────────────────────────────── */
export const PRESET_COLORS = [
  "#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#f97316",
  "#eab308", "#22c55e", "#14b8a6", "#3b82f6", "#64748b",
];

const DEFAULT_EXPENSE_CATEGORIES = [
  { id: "exp-1", name: "Business Expenses", type: "expense", color: "#6366f1" },
  { id: "exp-2", name: "Office Rent", type: "expense", color: "#8b5cf6" },
  { id: "exp-3", name: "Software Subscriptions", type: "expense", color: "#ec4899" },
  { id: "exp-4", name: "Professional Development", type: "expense", color: "#f43f5e" },
  { id: "exp-5", name: "Marketing", type: "expense", color: "#f97316" },
  { id: "exp-6", name: "Travel", type: "expense", color: "#22c55e" },
  { id: "exp-7", name: "Meals & Entertainment", type: "expense", color: "#14b8a6" },
  { id: "exp-8", name: "Utilities", type: "expense", color: "#3b82f6" },
];

const CategoryContext = createContext(null);

export function CategoryProvider({ children }) {
  const [expenseCategories, setExpenseCategories] = useState(DEFAULT_EXPENSE_CATEGORIES);
  const [incomeCategories, setIncomeCategories] = useState([]);

  const addCategory = (category) => {
    const newCat = {
      ...category,
      id: `${category.type}-${Date.now()}`,
    };
    if (category.type === "expense") {
      setExpenseCategories((prev) => [...prev, newCat]);
    } else {
      setIncomeCategories((prev) => [...prev, newCat]);
    }
  };

  const updateCategory = (id, updates) => {
    setExpenseCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    setIncomeCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const deleteCategory = (id) => {
    setExpenseCategories((prev) => prev.filter((c) => c.id !== id));
    setIncomeCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const getExpenseCategoryNames = () => expenseCategories.map((c) => c.name);
  const getIncomeCategoryNames = () => incomeCategories.map((c) => c.name);

  const getCategoryColor = (name) => {
    const exp = expenseCategories.find((c) => c.name === name);
    const inc = incomeCategories.find((c) => c.name === name);
    return exp?.color || inc?.color || "#64748b";
  };

  return (
    <CategoryContext.Provider
      value={{
        expenseCategories,
        incomeCategories,
        addCategory,
        updateCategory,
        deleteCategory,
        getExpenseCategoryNames,
        getIncomeCategoryNames,
        getCategoryColor,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const ctx = useContext(CategoryContext);
  if (!ctx) {
    throw new Error("useCategories must be used within CategoryProvider");
  }
  return ctx;
}
