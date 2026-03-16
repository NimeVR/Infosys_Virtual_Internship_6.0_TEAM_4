// @refresh reset
import { createContext, useContext, useState, useEffect } from "react";

const TaxPaymentContext = createContext(null);

import { api } from '../utils/api';

export function TaxPaymentProvider({ children }) {
  const [taxPayments, setTaxPayments] = useState([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  // whenever authToken changes we re-fetch tax payments
  useEffect(() => {
    if (!authToken) {
      console.warn('no auth token, skipping tax payments fetch');
      return;
    }

    (async () => {
      try {
        const res = await api('/api/tax-payments');
        const data = await res.json();
        if (res.ok) {
          const norm = data.payments.map((p) => ({ ...p, id: p._id }));
          setTaxPayments(norm);
        } else {
          console.error('failed to fetch tax payments', data.message);
        }
      } catch (err) {
        console.error('error fetching tax payments', err);
      }
    })();
  }, [authToken]);

  // helper to refresh token state (e.g. after login)
  const refreshTaxPayments = () => {
    setAuthToken(localStorage.getItem('token'));
  };

  const addTaxPayment = async (payment) => {
    try {
      const res = await api('/api/tax-payments', {
        method: 'POST',
        body: JSON.stringify(payment),
      });
      const data = await res.json();
      if (res.ok) {
        const n = { ...data.payment, id: data.payment._id };
        setTaxPayments((prev) => [n, ...prev]);
      } else {
        console.error('add tax payment failed', data.message);
        alert('Could not record tax payment: ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Error recording tax payment');
    }
  };

  const deleteTaxPayment = async (id) => {
    try {
      const res = await api(`/api/tax-payments/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTaxPayments((prev) => prev.filter((p) => p.id !== id));
      } else {
        const data = await res.json();
        console.error('delete tax payment failed', data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TaxPaymentContext.Provider value={{ taxPayments, addTaxPayment, deleteTaxPayment, refreshTaxPayments }}>
      {children}
    </TaxPaymentContext.Provider>
  );
}

export function useTaxPayments() {
  return useContext(TaxPaymentContext);
}