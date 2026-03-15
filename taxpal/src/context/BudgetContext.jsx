// @refresh reset
import { createContext, useContext, useState, useEffect } from "react";

const BudgetContext = createContext(null);

import { api } from '../utils/api';

export function BudgetProvider({ children }) {
  const [budgets, setBudgets] = useState([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  // whenever authToken changes we re-fetch budgets
  useEffect(() => {
    if (!authToken) {
      console.warn('no auth token, skipping budgets fetch');
      return;
    }

    (async () => {
      try {
        const res = await api('/api/budgets');
        const data = await res.json();
        if (res.ok) {
          const norm = data.budgets.map((b) => ({ ...b, id: b._id }));
          setBudgets(norm);
        } else {
          console.error('failed to fetch budgets', data.message);
        }
      } catch (err) {
        console.error('error fetching budgets', err);
      }
    })();
  }, [authToken]);

  // helper to refresh token state (e.g. after login)
  const refreshBudgets = () => {
    setAuthToken(localStorage.getItem('token'));
  };

  const addBudget = async (budget) => {
    try {
      const res = await api('/api/budgets', {
        method: 'POST',
        body: JSON.stringify(budget),
      });
      const data = await res.json();
      if (res.ok) {
        const n = { ...data.budget, id: data.budget._id };
        setBudgets((prev) => [...prev, n]);
      } else {
        console.error('add budget failed', data.message);
        alert('Could not add budget: ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Error adding budget');
    }
  };

  const deleteBudget = async (id) => {
    try {
      const res = await api(`/api/budgets/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBudgets((prev) => prev.filter((b) => b.id !== id));
      } else {
        const data = await res.json();
        console.error('delete budget failed', data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <BudgetContext.Provider value={{ budgets, addBudget, deleteBudget, refreshBudgets }}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudgets() {
  return useContext(BudgetContext);
}