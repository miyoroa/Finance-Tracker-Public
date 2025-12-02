"use client"
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { budgetOperations } from '@/utils/dataStore'
import BudgetItem from './BudgetItem'

function BudgetList() {

  const [budgetList,setBudgetList]=useState([]);
  
  useEffect(()=>{
    getBudgetList();
  },[])
  
  /**
   * used to get budget List
   */
  const getBudgetList=()=>{
    const result = budgetOperations.getAll();
    setBudgetList(result);
  }

  return (
    <div className='mt-7'>
        <div className='grid grid-cols-1
        md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <CreateBudget
        refreshData={()=>getBudgetList()}/>
        {budgetList?.length>0? budgetList.map((budget,index)=>(
          <BudgetItem budget={budget} key={index} />
        ))
      :[1,2,3,4,5].map((item,index)=>(
        <div key={index} className='w-full bg-slate-200 dark:bg-gray-700 rounded-lg
        h-[150px] animate-pulse'>

        </div>
      ))
      }
        </div>
       
    </div>
  )
}

export default BudgetList