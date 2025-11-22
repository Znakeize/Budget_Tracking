import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BudgetContext = createContext();

export function useBudget() {
  return useContext(BudgetContext);
}

export function BudgetProvider({ children }) {
  const [budgetData, setBudgetData] = useState({
    income: 0,
    expenses: 0,
    balance: 0,
    categories: {},
    recentTransactions: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBudgetData = async () => {
    try {
      const response = await axios.get('/api/budgets/summary');
      setBudgetData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch budget data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgetData();
  }, []);

  const addTransaction = async (transaction) => {
    try {
      const response = await axios.post('/api/transactions', transaction);
      await fetchBudgetData();
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to add transaction');
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`/api/transactions/${id}`);
      await fetchBudgetData();
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to delete transaction');
    }
  };

  const value = {
    budgetData,
    loading,
    error,
    addTransaction,
    deleteTransaction,
    refreshData: fetchBudgetData
  };

  return (
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  );
}