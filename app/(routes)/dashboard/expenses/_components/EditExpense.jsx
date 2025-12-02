import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { expenseOperations } from "@/utils/dataStore";

function EditExpense({ expense, onClose, refreshData }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  
  useEffect(() => {
    if (expense) {
      setName(expense.name || "");
      setAmount(expense.amount || "");
      setDate(expense.createdAt ? new Date(expense.createdAt).toISOString().slice(0, 10) : "");
    }
  }, [expense]);
  
  /**
   * Used to Update Expense
   */
  const updateExpense = async () => {
    setLoading(true);
    
    expenseOperations.update(expense.id, {
      name: name,
      amount: amount,
      createdAt: date ? new Date(date).toISOString() : undefined,
    });

    setLoading(false);
    refreshData();
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 p-6 rounded-2xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg text-gray-900 dark:text-white">Edit Expense</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <h2 className="text-gray-900 dark:text-white font-medium my-1">Expense Name</h2>
            <Input
              placeholder="e.g. Bedroom Decor"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          <div>
            <h2 className="text-gray-900 dark:text-white font-medium my-1">Expense Amount</h2>
            <Input
              placeholder="e.g. 1000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          <div>
            <h2 className="text-gray-900 dark:text-white font-medium my-1">Date</h2>
            <Input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              disabled={!(name && amount) || loading}
              onClick={() => updateExpense()}
              className="flex-1"
            >
              {loading ? <Loader className="animate-spin" /> : "Update Expense"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditExpense;
