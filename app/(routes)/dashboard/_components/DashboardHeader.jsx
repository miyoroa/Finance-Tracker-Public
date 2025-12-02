import React from 'react'
import { ThemeToggle } from '@/components/ui/theme-toggle'

function DashboardHeader() {
  return (
    <div className='p-5 shadow-sm border-b flex justify-between bg-white dark:bg-gray-900 dark:border-gray-700'>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Finance Tracker</h1>
        </div>
        <div className="flex items-center gap-4">
            <ThemeToggle />
        </div>
       
    </div>
  )
}

export default DashboardHeader