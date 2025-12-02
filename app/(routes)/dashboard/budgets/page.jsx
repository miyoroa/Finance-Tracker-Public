"use client";
import React from 'react'
import BudgetList from './_components/BudgetList'
import { exportBudgetsToCSV } from '@/utils/csvExport';
import { DownloadButton } from '@/components/ui/download-button';
import { budgetOperations } from '@/utils/dataStore';

function Budget() {
  const handleExport = () => {
    const budgets = budgetOperations.getAll();
    exportBudgetsToCSV(budgets);
  };

  return (
    <div className='p-10 bg-gray-50 dark:bg-gray-900 min-h-screen'>
      <div className="flex justify-between items-center mb-6">
        <h2 className='font-bold text-3xl text-gray-900 dark:text-white'>My Budgets</h2>
        <DownloadButton 
          onClick={handleExport}
          variant="outline"
          size="sm"
        >
          Export CSV
        </DownloadButton>
      </div>
      <BudgetList/>
    </div>
  )
}

export default Budget