const BalanceSummary = ({ transactions }) => {
  const totalIncome = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Your Balance</h3>
        <h2 className="text-2xl font-bold">${balance.toFixed(2)}</h2>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg flex justify-between mb-6">
        <div className="text-center">
          <h4 className="font-semibold">Income</h4>
          <p className="text-green-600">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="text-center">
          <h4 className="font-semibold">Expense</h4>
          <p className="text-red-600">${totalExpenses.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default BalanceSummary;