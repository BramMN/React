import Expenses from "./components/Expenses/Expenses";

const App = () => {
  const expenses = [
    {
      id: "e1",
      title: "Bitcoin",
      amount: 940.12,
      date: new Date(2020, 7, 14),
    },
    {
      id: "e2",
      title: "Ethereum",
      amount: 799.49,
      date: new Date(2021, 2, 12),
    },
    {
      id: "e3",
      title: "ADA",
      amount: 294.67,
      date: new Date(2021, 2, 28),
    },
    {
      id: "e4",
      title: "LINK",
      amount: 450.44,
      date: new Date(2021, 5, 12),
    },
  ];

  return (
    <div>
      <h2><center>Portfolio</center></h2>
      <Expenses array = {expenses} />
    </div>
  );
}

export default App;
