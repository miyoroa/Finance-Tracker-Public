// Utility functions for CSV export

/**
 * Convert data to CSV format
 * @param {Array} data - Array of objects to convert
 * @param {Array} headers - Array of header objects with key and label
 * @returns {string} CSV string
 */
export const convertToCSV = (data, headers) => {
  if (!data || data.length === 0) {
    return '';
  }

  // Create header row
  const headerRow = headers.map(header => `"${header.label}"`).join(',');
  
  // Create data rows
  const dataRows = data.map(item => {
    return headers.map(header => {
      const value = item[header.key];
      // Handle different data types and escape quotes
      if (value === null || value === undefined) {
        return '""';
      }
      if (typeof value === 'string') {
        return `"${value.replace(/"/g, '""')}"`;
      }
      if (value instanceof Date) {
        return `"${value.toISOString().split('T')[0]}"`;
      }
      return `"${value}"`;
    }).join(',');
  });

  return [headerRow, ...dataRows].join('\n');
};

/**
 * Download CSV file
 * @param {string} csvContent - CSV string content
 * @param {string} filename - Name of the file to download
 */
export const downloadCSV = (csvContent, filename) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

/**
 * Export expenses data to CSV
 * @param {Array} expenses - Array of expense objects
 */
export const exportExpensesToCSV = (expenses) => {
  const headers = [
    { key: 'name', label: 'Expense Name' },
    { key: 'amount', label: 'Amount' },
    { key: 'createdAt', label: 'Date' },
    { key: 'budgetId', label: 'Budget ID' }
  ];

  const csvContent = convertToCSV(expenses, headers);
  const filename = `expenses_${new Date().toISOString().split('T')[0]}.csv`;
  downloadCSV(csvContent, filename);
};

/**
 * Export budgets data to CSV
 * @param {Array} budgets - Array of budget objects
 */
export const exportBudgetsToCSV = (budgets) => {
  const headers = [
    { key: 'name', label: 'Budget Name' },
    { key: 'amount', label: 'Budget Amount' },
    { key: 'totalSpend', label: 'Total Spent' },
    { key: 'totalItem', label: 'Number of Items' },
    { key: 'icon', label: 'Icon' }
  ];

  const csvContent = convertToCSV(budgets, headers);
  const filename = `budgets_${new Date().toISOString().split('T')[0]}.csv`;
  downloadCSV(csvContent, filename);
};

/**
 * Export incomes data to CSV
 * @param {Array} incomes - Array of income objects
 */
export const exportIncomesToCSV = (incomes) => {
  const headers = [
    { key: 'name', label: 'Income Source' },
    { key: 'amount', label: 'Amount' },
    { key: 'totalAmount', label: 'Total Amount' },
    { key: 'icon', label: 'Icon' }
  ];

  const csvContent = convertToCSV(incomes, headers);
  const filename = `incomes_${new Date().toISOString().split('T')[0]}.csv`;
  downloadCSV(csvContent, filename);
};

/**
 * Export all financial data to CSV
 * @param {Object} data - Object containing budgets, incomes, and expenses
 */
export const exportAllDataToCSV = (data) => {
  const { budgets, incomes, expenses } = data;
  
  // Create a comprehensive CSV with all data
  const allData = [];
  
  // Add budgets
  budgets.forEach(budget => {
    allData.push({
      type: 'Budget',
      name: budget.name,
      amount: budget.amount,
      spent: budget.totalSpend,
      items: budget.totalItem,
      icon: budget.icon
    });
  });
  
  // Add incomes
  incomes.forEach(income => {
    allData.push({
      type: 'Income',
      name: income.name,
      amount: income.amount,
      total: income.totalAmount,
      icon: income.icon
    });
  });
  
  // Add expenses
  expenses.forEach(expense => {
    allData.push({
      type: 'Expense',
      name: expense.name,
      amount: expense.amount,
      date: expense.createdAt ? new Date(expense.createdAt).toISOString().split('T')[0] : '',
      budgetId: expense.budgetId
    });
  });

  const headers = [
    { key: 'type', label: 'Type' },
    { key: 'name', label: 'Name' },
    { key: 'amount', label: 'Amount' },
    { key: 'spent', label: 'Spent' },
    { key: 'items', label: 'Items' },
    { key: 'date', label: 'Date' },
    { key: 'budgetId', label: 'Budget ID' },
    { key: 'total', label: 'Total' },
    { key: 'icon', label: 'Icon' }
  ];

  const csvContent = convertToCSV(allData, headers);
  const filename = `financial_data_${new Date().toISOString().split('T')[0]}.csv`;
  downloadCSV(csvContent, filename);
};
