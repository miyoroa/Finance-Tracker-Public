import { Trash, Edit } from "lucide-react";
import React, { useState } from "react";
import { expenseOperations } from "@/utils/dataStore";
import AddExpenseDashboard from "../../_components/AddExpenseDashboard";
import EditExpense from "./EditExpense";

function ExpenseListTable({ expensesList, refreshData }) {
  const [editingExpense, setEditingExpense] = useState(null);

  const deleteExpense = async (expense) => {
    expenseOperations.delete(expense.id);
    refreshData();
  };

  const editExpense = (expense) => {
    setEditingExpense(expense);
  };
  
  return (
    <div className="mt-3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg text-gray-900 dark:text-white">Latest Expenses</h2>
        <AddExpenseDashboard refreshData={refreshData} />
      </div>
      <div className="grid grid-cols-5 rounded-tl-xl rounded-tr-xl bg-slate-200 dark:bg-gray-700 p-2 mt-3">
        <h2 className="font-bold text-gray-900 dark:text-white">Name</h2>
        <h2 className="font-bold text-gray-900 dark:text-white">Amount</h2>
        <h2 className="font-bold text-gray-900 dark:text-white">Date</h2>
        <h2 className="font-bold text-gray-900 dark:text-white">Edit</h2>
        <h2 className="font-bold text-gray-900 dark:text-white">Delete</h2>
      </div>
      {expensesList.map((expenses, index) => (
        <div key={index} className="grid grid-cols-5 bg-slate-50 dark:bg-gray-800 rounded-bl-xl rounded-br-xl p-2 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-gray-900 dark:text-white">{expenses.name}</h2>
          <h2 className="text-gray-900 dark:text-white">{expenses.amount}</h2>
          <h2 className="text-gray-900 dark:text-white">{expenses.createdAt ? new Date(expenses.createdAt).toISOString().slice(0, 10) : ''}</h2>
          <div className="flex items-center">
            <Edit
              className="text-blue-500 cursor-pointer hover:text-blue-700 dark:hover:text-blue-400"
              onClick={() => editExpense(expenses)}
              size={18}
            />
          </div>
          <div className="flex items-center">
            <Trash
              className="text-red-500 cursor-pointer hover:text-red-700 dark:hover:text-red-400"
              onClick={() => deleteExpense(expenses)}
              size={18}
            />
          </div>
        </div>
      ))}
      
      {editingExpense && (
        <EditExpense
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
          refreshData={refreshData}
        />
      )}
    </div>
  );
}

export default ExpenseListTable;
