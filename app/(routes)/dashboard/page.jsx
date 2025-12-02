"use client";
import React, { useEffect, useState } from "react";
import CardInfo from "./_components/CardInfo";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";
import AddExpenseDashboard from "./_components/AddExpenseDashboard";
import { getDashboardData } from "@/utils/dataStore";
import { exportAllDataToCSV } from "@/utils/csvExport";
import { DownloadButton } from "@/components/ui/download-button";

function Dashboard() {
  const [budgetList, setBudgetList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    const { budgets, incomes, expenses } = getDashboardData();
    setBudgetList(budgets);
    setIncomeList(incomes);
    setExpensesList(expenses);
  };

  const handleExportAll = () => {
    const data = getDashboardData();
    exportAllDataToCSV(data);
  };

  // Filter logic
  const searchLower = search.toLowerCase();
  const filteredBudgets = budgetList.filter(
    (b) =>
      b.name.toLowerCase().includes(searchLower) ||
      (b.icon && b.icon.toLowerCase().includes(searchLower))
  );
  const filteredIncomes = incomeList.filter(
    (i) =>
      i.name.toLowerCase().includes(searchLower) ||
      (i.icon && i.icon.toLowerCase().includes(searchLower))
  );
  const filteredExpenses = expensesList.filter(
    (e) =>
      e.name.toLowerCase().includes(searchLower) ||
      (e.amount && String(e.amount).toLowerCase().includes(searchLower))
  );

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h2 className="font-bold text-4xl text-gray-900 dark:text-white">Welcome to Finance Tracker </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Here's what's happening with your money. Let's manage your expenses!
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <input
            type="text"
            placeholder="Search budgets, incomes, expenses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            style={{ minWidth: 220 }}
          />
          <div className="flex gap-2">
            <DownloadButton 
              onClick={handleExportAll}
              variant="outline"
              size="sm"
            >
              Export All Data
            </DownloadButton>
            <AddExpenseDashboard refreshData={loadDashboardData} />
          </div>
        </div>
      </div>

      <CardInfo budgetList={filteredBudgets} incomeList={filteredIncomes} />
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
        <div className="lg:col-span-2">
          <BarChartDashboard budgetList={filteredBudgets} />

          <ExpenseListTable
            expensesList={filteredExpenses}
            refreshData={() => loadDashboardData()}
          />
        </div>
        <div className="grid gap-5">
          <h2 className="font-bold text-lg text-gray-900 dark:text-white">Latest Budgets</h2>
          {filteredBudgets?.length > 0
            ? filteredBudgets.map((budget, index) => (
                <BudgetItem budget={budget} key={index} />
              ))
            : [1, 2, 3, 4].map((item, index) => (
                <div
                  className="h-[180px] w-full
                 bg-slate-200 dark:bg-gray-700 rounded-lg animate-pulse"
                  key={index}
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
