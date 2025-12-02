import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function BarChartDashboard({ budgetList }) {
  // Ensure budgetList is an array and has data
  if (!budgetList || budgetList.length === 0) {
    return (
      <div className="border rounded-2xl p-5 bg-white dark:bg-gray-800 dark:border-gray-700">
        <h2 className="font-bold text-lg text-gray-900 dark:text-white">Activity</h2>
        <div className="h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-400">
          No budget data available
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-2xl p-5 bg-white dark:bg-gray-800 dark:border-gray-700">
      <h2 className="font-bold text-lg text-gray-900 dark:text-white">Activity</h2>
      <ResponsiveContainer width={"80%"} height={300}>
        <BarChart
          data={budgetList}
          margin={{
            top: 7,
          }}
        >
          <XAxis dataKey="name" tick={{ fill: '#9CA3AF' }} />
          <YAxis tick={{ fill: '#9CA3AF' }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#F9FAFB' }}
          />
          <Legend />
          <Bar dataKey="totalSpend" stackId="a" fill="#4845d2" />
          <Bar dataKey="amount" stackId="a" fill="#C3C2FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartDashboard;
