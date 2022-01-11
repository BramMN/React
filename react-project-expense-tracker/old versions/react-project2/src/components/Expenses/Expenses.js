import React, { useState } from "react";

import "./Expenses.css";
import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpenseFilter";

const Expenses = (props) => {
  const [enteredYear, setEnteredYear] = useState("2020");

  const addYearHandler = (year) => {
    setEnteredYear(year);
  };

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter selected={enteredYear} onAddYear={addYearHandler} />
        <ExpenseItem
          date={props.array[0].date}
          title={props.array[0].title}
          amount={props.array[0].amount}
        ></ExpenseItem>
        <ExpenseItem
          date={props.array[1].date}
          title={props.array[1].title}
          amount={props.array[1].amount}
        ></ExpenseItem>
        <ExpenseItem
          date={props.array[2].date}
          title={props.array[2].title}
          amount={props.array[2].amount}
        ></ExpenseItem>
        <ExpenseItem
          date={props.array[3].date}
          title={props.array[3].title}
          amount={props.array[3].amount}
        ></ExpenseItem>
      </Card>
    </div>
  );
};

export default Expenses;
