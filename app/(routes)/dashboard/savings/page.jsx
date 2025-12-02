"use client";
import React, { useEffect, useState } from "react";
import { getDashboardData } from "@/utils/dataStore";
import { exportAllDataToCSV } from "@/utils/csvExport";
import { DownloadButton } from "@/components/ui/download-button";
import { Wallet, TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";

function SavingsPage() {
  const [savingsData, setSavingsData] = useState({
    totalIncome: 0,
    totalBudgeted: 0,
    totalSpent: 0,
    totalSavings: 0,
    savingsRate: 0,
    budgetUtilization: 0
  });

  useEffect(() => {
    calculateSavings();
  }, []);

  const calculateSavings = () => {
    const { budgets, incomes, expenses } = getDashboardData();
    
    // Calculate total income
    const totalIncome = incomes.reduce((sum, income) => sum + Number(income.amount), 0);
    
    // Calculate total budgeted amount
    const totalBudgeted = budgets.reduce((sum, budget) => sum + Number(budget.amount), 0);
    
    // Calculate total spent
    const totalSpent = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
    
    // Calculate savings (income - spent)
    const totalSavings = totalIncome - totalSpent;
    
    // Calculate savings rate (savings / income * 100)
    const savingsRate = totalIncome > 0 ? (totalSavings / totalIncome * 100) : 0;
    
    // Calculate budget utilization (spent / budgeted * 100)
    const budgetUtilization = totalBudgeted > 0 ? (totalSpent / totalBudgeted * 100) : 0;

    setSavingsData({
      totalIncome,
      totalBudgeted,
      totalSpent,
      totalSavings,
      savingsRate,
      budgetUtilization
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getSavingsStatus = () => {
    if (savingsData.totalSavings > 0) {
      return { text: "You're saving money!", color: "text-green-600", bgColor: "bg-green-100" };
    } else if (savingsData.totalSavings < 0) {
      return { text: "You're spending more than income", color: "text-red-600", bgColor: "bg-red-100" };
    } else {
      return { text: "You're breaking even", color: "text-yellow-600", bgColor: "bg-yellow-100" };
    }
  };

  const savingsStatus = getSavingsStatus();

  const handleExport = () => {
    const data = getDashboardData();
    exportAllDataToCSV(data);
  };

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Savings Overview</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your savings and financial health</p>
        </div>
        <DownloadButton 
          onClick={handleExport}
          variant="outline"
          size="sm"
        >
          Export Data
        </DownloadButton>
      </div>

      {/* Main Savings Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Wallet className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Total Savings</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Your current savings balance</p>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full ${savingsStatus.bgColor} dark:bg-opacity-20`}>
            <span className={`font-semibold ${savingsStatus.color} dark:text-opacity-90`}>
              {savingsStatus.text}
            </span>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {formatCurrency(savingsData.totalSavings)}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {savingsData.savingsRate.toFixed(1)}% of your income
          </div>
        </div>
      </div>

      {/* Financial Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Income */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Income</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(savingsData.totalIncome)}</p>
          </div>
        </div>

        {/* Total Budgeted */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Budgeted</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(savingsData.totalBudgeted)}</p>
          </div>
        </div>

        {/* Total Spent */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
              <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Spent</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(savingsData.totalSpent)}</p>
          </div>
        </div>

        {/* Budget Utilization */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Budget Used</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{savingsData.budgetUtilization.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Income vs Spending Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Income vs Spending</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1 text-gray-900 dark:text-white">
                <span>Income</span>
                <span>{formatCurrency(savingsData.totalIncome)}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: '100%' }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1 text-gray-900 dark:text-white">
                <span>Spending</span>
                <span>{formatCurrency(savingsData.totalSpent)}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-red-600 h-2 rounded-full" 
                  style={{ width: `${Math.min((savingsData.totalSpent / savingsData.totalIncome) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1 text-gray-900 dark:text-white">
                <span>Savings</span>
                <span>{formatCurrency(savingsData.totalSavings)}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${Math.max((savingsData.totalSavings / savingsData.totalIncome) * 100, 0)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Budget Utilization */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Budget Utilization</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1 text-gray-900 dark:text-white">
                <span>Budgeted Amount</span>
                <span>{formatCurrency(savingsData.totalBudgeted)}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: '100%' }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1 text-gray-900 dark:text-white">
                <span>Actually Spent</span>
                <span>{formatCurrency(savingsData.totalSpent)}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    savingsData.budgetUtilization > 100 ? 'bg-red-600' : 'bg-green-600'
                  }`}
                  style={{ width: `${Math.min(savingsData.budgetUtilization, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="pt-4 border-t dark:border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Status:</span>
                <span className={`text-sm font-semibold ${
                  savingsData.budgetUtilization > 100 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                }`}>
                  {savingsData.budgetUtilization > 100 ? 'Over Budget' : 'Under Budget'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">💡 Savings Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
          <div>
            <p className="font-medium mb-2">🎯 Set a Savings Goal</p>
            <p>Aim to save at least 20% of your income for a healthy financial future.</p>
          </div>
          <div>
            <p className="font-medium mb-2">📊 Track Your Spending</p>
            <p>Monitor your expenses regularly to identify areas where you can cut back.</p>
          </div>
          <div>
            <p className="font-medium mb-2">💰 Emergency Fund</p>
            <p>Build an emergency fund with 3-6 months of expenses for financial security.</p>
          </div>
          <div>
            <p className="font-medium mb-2">📈 Increase Income</p>
            <p>Look for opportunities to increase your income through side hustles or career growth.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavingsPage; 