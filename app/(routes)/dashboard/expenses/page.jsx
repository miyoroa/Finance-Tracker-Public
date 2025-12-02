"use client"
import React, { useEffect, useState } from 'react'
import ExpenseListTable from './_components/ExpenseListTable';
import { expenseOperations } from '@/utils/dataStore';
import { exportExpensesToCSV } from '@/utils/csvExport';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import moment from 'moment';
import { DownloadButton } from '@/components/ui/download-button';

function ExpensesScreen() {
  const [expensesList, setExpensesList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    getAllExpenses();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      // Filter expenses for the selected date
      const day = moment(selectedDate).format('YYYY-MM-DD');
      setFilteredExpenses(
        expensesList.filter(e => moment(e.createdAt).format('YYYY-MM-DD') === day)
      );
    } else {
      setFilteredExpenses(expensesList);
    }
  }, [selectedDate, expensesList]);

  useEffect(() => {
    // Prepare line chart data for the last 12 months
    const now = moment();
    const monthlyTotals = Array.from({ length: 12 }, (_, i) => {
      const month = moment(now).subtract(11 - i, 'months');
      const total = expensesList
        .filter(e => moment(e.createdAt).isSame(month, 'month'))
        .reduce((sum, e) => sum + Number(e.amount), 0);
      return {
        date: month.format('MMM YYYY'),
        total,
      };
    });
    setLineData(monthlyTotals);
  }, [expensesList]);

  const getAllExpenses = () => {
    const result = expenseOperations.getAll();
    setExpensesList(result);
  };

  return (
    <div className='p-10 bg-gray-50 dark:bg-gray-900 min-h-screen'>
      <div className="flex justify-between items-center mb-6">
        <h2 className='font-bold text-3xl text-gray-900 dark:text-white'>My Expenses</h2>
        <DownloadButton 
          onClick={() => exportExpensesToCSV(filteredExpenses)}
          variant="outline"
          size="sm"
        >
          Export CSV
        </DownloadButton>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Monthly Spending Trend (Last 12 Months)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
              <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
              <Tooltip 
                formatter={v => `$${v}`} 
                labelFormatter={d => d}
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#F9FAFB' }}
              />
              <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col items-center">
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Filter by Date</h3>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={({ date, view }) => {
              if (
                expensesList.find(e => moment(e.createdAt).isSame(date, 'day'))
              ) {
                return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-bold rounded-full';
              }
              return null;
            }}
          />
          {selectedDate && (
            <button
              className="mt-2 text-sm text-blue-600 dark:text-blue-400 underline"
              onClick={() => setSelectedDate(null)}
            >
              Clear filter
            </button>
          )}
        </div>
      </div>
      <ExpenseListTable
        refreshData={() => getAllExpenses()}
        expensesList={filteredExpenses}
      />
    </div>
  )
}

export default ExpensesScreen