"use client";
import React from "react";
import IncomeList from "./_components/IncomeList";
import { exportIncomesToCSV } from '@/utils/csvExport';
import { DownloadButton } from '@/components/ui/download-button';
import { incomeOperations } from '@/utils/dataStore';

function Income() {
  const handleExport = () => {
    const incomes = incomeOperations.getAll();
    exportIncomesToCSV(incomes);
  };

  return (
    <div className="p-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-3xl text-gray-900 dark:text-white">My Income Streams</h2>
        <DownloadButton 
          onClick={handleExport}
          variant="outline"
          size="sm"
        >
          Export CSV
        </DownloadButton>
      </div>
      <IncomeList />
    </div>
  );
}

export default Income;
