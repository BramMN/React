import React, { useState } from "react";

import "./Expenses.css";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpenseFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

const Expenses = (props) => {
  const [enteredYear, setEnteredYear] = useState("2020");

  const addYearHandler = (year) => {
    setEnteredYear(year);
  };

  const yearFilter = props.array.filter((expense) => {
    return expense.date.getFullYear().toString() === enteredYear;
  });

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter selected={enteredYear} onAddYear={addYearHandler} />
        <ExpensesChart expenses={yearFilter}/>
        <ExpensesList items={yearFilter}/>
      </Card>
    </div>
  );
};

export default Expenses;
