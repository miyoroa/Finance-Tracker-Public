import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { expenseOperations } from "@/utils/dataStore";

function AddExpense({ budgetId, refreshData }) {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  
  /**
   * Used to Add New Expense
   */
  const addNewExpense = async () => {
    setLoading(true);
    
    expenseOperations.create({
      name: name,
      amount: amount,
      budgetId: parseInt(budgetId),
      createdAt: date ? new Date(date).toISOString() : undefined,
    });

    setAmount("");
    setName("");
    setDate("");
    setLoading(false);
    refreshData();
  };
  
  return (
    <div className="border p-5 rounded-2xl bg-white dark:bg-gray-800 dark:border-gray-700">
      <h2 className="font-bold text-lg text-gray-900 dark:text-white">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-gray-900 dark:text-white font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Bedroom Decor"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div className="mt-2">
        <h2 className="text-gray-900 dark:text-white font-medium my-1">Expense Amount</h2>
        <Input
          placeholder="e.g. 1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div className="mt-2">
        <h2 className="text-gray-900 dark:text-white font-medium my-1">Date</h2>
        <Input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <Button
        disabled={!(name && amount) || loading}
        onClick={() => addNewExpense()}
        className="mt-3 w-full rounded-full"
      >
        {loading ? <Loader className="animate-spin" /> : "Add New Expense"}
      </Button>
    </div>
  );
}

export default AddExpense;
