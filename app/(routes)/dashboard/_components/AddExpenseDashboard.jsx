"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { expenseOperations, budgetOperations } from "@/utils/dataStore";
import { Plus } from "lucide-react";

function AddExpenseDashboard({ refreshData }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [budgetId, setBudgetId] = useState("");
  const [budgets, setBudgets] = useState([]);
  const [date, setDate] = useState("");

  // Load budgets when component mounts
  React.useEffect(() => {
    const budgetList = budgetOperations.getAll();
    setBudgets(budgetList);
    if (budgetList.length > 0) {
      setBudgetId(budgetList[0].id.toString());
    }
  }, []);

  const handleAddExpense = () => {
    if (!name || !amount || !budgetId) {
      alert("Please fill in all fields");
      return;
    }

    expenseOperations.create({
      name: name,
      amount: amount,
      budgetId: parseInt(budgetId),
      createdAt: date ? new Date(date).toISOString() : undefined,
    });

    setName("");
    setAmount("");
    setDate("");
    refreshData();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2 items-center rounded-full">
          <Plus className="w-4 h-4" />
          Add Expense
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
          <DialogDescription>
            Add a new expense to track your spending.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-900 dark:text-white">Expense Name</label>
            <Input
              placeholder="e.g. Groceries"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-900 dark:text-white">Amount</label>
            <Input
              type="number"
              placeholder="e.g. 100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-900 dark:text-white">Budget Category</label>
            <select
              value={budgetId}
              onChange={(e) => setBudgetId(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.icon} {budget.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-900 dark:text-white">Date</label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              disabled={!name || !amount || !budgetId}
              onClick={handleAddExpense}
              className="w-full"
            >
              Add Expense
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddExpenseDashboard; 