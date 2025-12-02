// utils/dataStore.js
import { toast } from "sonner";

// Load data from localStorage or use defaults
const getInitialData = () => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('finance-trackerData');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }
  // Default sample data
  return {
    budgets: [
      {
        id: 1,
        name: "Home Decor",
        amount: "5000",
        icon: "🏠",
        createdBy: "anonymous_user",
        totalSpend: 1200,
        totalItem: 3
      },
      {
        id: 2,
        name: "Groceries",
        amount: "3000",
        icon: "🛒",
        createdBy: "anonymous_user",
        totalSpend: 800,
        totalItem: 2
      },
      {
        id: 3,
        name: "Entertainment",
        amount: "2000",
        icon: "🎬",
        createdBy: "anonymous_user",
        totalSpend: 500,
        totalItem: 1
      }
    ],
    incomes: [
      {
        id: 1,
        name: "Salary",
        amount: "8000",
        icon: "💰",
        createdBy: "anonymous_user",
        totalAmount: 8000,
        totalSpend: 0,
        totalItem: 0
      },
      {
        id: 2,
        name: "Freelance",
        amount: "3000",
        icon: "💼",
        createdBy: "anonymous_user",
        totalAmount: 3000,
        totalSpend: 0,
        totalItem: 0
      }
    ],
    expenses: [
      {
        id: 1,
        name: "Sofa Set",
        amount: "800",
        budgetId: 1,
        createdAt: "2025-01-15T10:30:00.000Z"
      },
      {
        id: 2,
        name: "Wall Art",
        amount: "400",
        budgetId: 1,
        createdAt: "2025-01-16T14:20:00.000Z"
      },
      {
        id: 3,
        name: "Weekly Groceries",
        amount: "500",
        budgetId: 2,
        createdAt: "2025-01-17T09:15:00.000Z"
      },
      {
        id: 4,
        name: "Movie Tickets",
        amount: "500",
        budgetId: 3,
        createdAt: "2025-01-18T19:00:00.000Z"
      }
    ]
  };
};

// Save data to localStorage
const saveData = (data) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('finance-trackerData', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data:', error);
    toast.error('Failed to save data');
  }
};

// Budget operations
export const budgetOperations = {
  getAll: () => {
    const data = getInitialData();
    return data.budgets.map(budget => ({
      ...budget,
      totalSpend: data.expenses
        .filter(expense => expense.budgetId === budget.id)
        .reduce((sum, expense) => sum + Number(expense.amount), 0),
      totalItem: data.expenses.filter(expense => expense.budgetId === budget.id).length
    }));
  },

  create: (budgetData) => {
    const data = getInitialData();
    const newBudget = {
      id: Date.now(),
      name: budgetData.name,
      amount: budgetData.amount,
      icon: budgetData.icon,
      createdBy: "anonymous_user"
    };
    data.budgets.push(newBudget);
    saveData(data);
    toast.success("New Budget Created!");
    return newBudget;
  },

  delete: (id) => {
    const data = getInitialData();
    data.budgets = data.budgets.filter(budget => budget.id !== id);
    // Also delete related expenses
    data.expenses = data.expenses.filter(expense => expense.budgetId !== id);
    saveData(data);
    toast.success("Budget deleted!");
  }
};

// Income operations
export const incomeOperations = {
  getAll: () => {
    const data = getInitialData();
    return data.incomes.map(income => ({
      ...income,
      totalAmount: Number(income.amount),
      totalSpend: 0, // Incomes don't have expenses
      totalItem: 0
    }));
  },

  create: (incomeData) => {
    const data = getInitialData();
    const newIncome = {
      id: Date.now(),
      name: incomeData.name,
      amount: incomeData.amount,
      icon: incomeData.icon,
      createdBy: "anonymous_user"
    };
    data.incomes.push(newIncome);
    saveData(data);
    toast.success("New Income Source Created!");
    return newIncome;
  },

  delete: (id) => {
    const data = getInitialData();
    data.incomes = data.incomes.filter(income => income.id !== id);
    saveData(data);
    toast.success("Income source deleted!");
  }
};

// Expense operations
export const expenseOperations = {
  getAll: () => {
    const data = getInitialData();
    return data.expenses.map(expense => ({
      id: expense.id,
      name: expense.name,
      amount: expense.amount,
      createdAt: expense.createdAt,
      budgetId: expense.budgetId
    }));
  },

  create: (expenseData) => {
    const data = getInitialData();
    const newExpense = {
      id: Date.now(),
      name: expenseData.name,
      amount: expenseData.amount,
      budgetId: expenseData.budgetId,
      createdAt: expenseData.createdAt || new Date().toISOString()
    };
    data.expenses.push(newExpense);
    saveData(data);
    toast.success("Expense added!");
    return newExpense;
  },

  delete: (id) => {
    const data = getInitialData();
    data.expenses = data.expenses.filter(expense => expense.id !== id);
    saveData(data);
    toast.success("Expense deleted!");
  },

  update: (id, expenseData) => {
    const data = getInitialData();
    const expenseIndex = data.expenses.findIndex(expense => expense.id === id);
    if (expenseIndex !== -1) {
      data.expenses[expenseIndex] = { ...data.expenses[expenseIndex], ...expenseData };
      saveData(data);
      toast.success("Expense updated!");
    }
  }
};

// Get all data for dashboard
export const getDashboardData = () => {
  const budgets = budgetOperations.getAll();
  const incomes = incomeOperations.getAll();
  const expenses = expenseOperations.getAll();
  return { budgets, incomes, expenses };
};