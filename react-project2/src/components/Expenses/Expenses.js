import "./Expenses.css";
import ExpenseItem from "./ExpenseItem";
import Card from '../UI/Card'

const Expenses = (props) => {
  return (
    <Card className="expenses">
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
  );
}

export default Expenses;
