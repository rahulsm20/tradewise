import React from "react";
import AccountBalance from "./AccountBalance";
import IncomeSource from "./IncomeSource";
import IncomeVSpending from "./IncomeVSpending";
import Spendings from "./Spendings";
import Assets from "./Assets";
import Debt from "./Debt";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BudgetBody = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    isAuthenticated ? (
      <div className="m-10 flex flex-col gap-5 w-screen">
        <h1>Budget</h1>
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 justify-center gap-10 sm:p-20">
          <AccountBalance />
          <Assets />
          <IncomeVSpending />
          <IncomeSource />
          <Spendings />
          <Debt />
        </div>
      </div>
    ) : (
      <div className="p-20 w-screen">
        <Link to="/login">Please login to access budget</Link>
      </div>
    )
  );
};

export default BudgetBody;
