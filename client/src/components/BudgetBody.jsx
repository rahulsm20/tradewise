import React from 'react'
import AccountBalance from './AccountBalance'
import IncomeSource from './IncomeSource'
import IncomeVSpending from './IncomeVSpending'
import Spendings from './Spendings'
import Assets from './Assets'
import Debt from './Debt'

const BudgetBody = () => {
  return (
    <div className='m-5'>
      <h1>Budget</h1>
    <div className='grid lg:grid-cols-3 sm:grid-cols-1 justify-center gap-10 p-10'>
      <AccountBalance/>
      <Assets/>
      <IncomeVSpending/>
      <IncomeSource/>
      <Spendings/>
      <Debt/>
    </div>
    </div>
  )
}

export default BudgetBody