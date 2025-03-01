const TransactionList = ({ transactions, deleteTransaction }) => {
    return (
      <ul className="space-y-2 mt-4">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className={`flex justify-between items-center p-3 rounded-lg ${
              transaction.amount < 0 ? 'bg-red-50' : 'bg-green-50'
            }`}
          >
            <span>{transaction.text}</span>
            <span className={`font-semibold ${
              transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
            }`}>
              ${Math.abs(transaction.amount).toFixed(2)}
            </span>
            <button
              onClick={() => deleteTransaction(transaction.id)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    );
  };
  
  export default TransactionList;