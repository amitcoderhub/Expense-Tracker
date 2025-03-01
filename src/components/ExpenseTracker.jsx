import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BalanceSummary from './BalanceSummary';
import TransactionList from './TransactionList';
import AddTransactionForm from './AddTransactionForm';
import FilterButtons from './FilterButtons';
import ExportButton from './ExportButton';

const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [filter, setFilter] = useState('all');
  const [showHistory, setShowHistory] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  // Load transactions from localStorage
  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions'));
    if (storedTransactions) setTransactions(storedTransactions);
  }, []);

  // Save transactions to localStorage
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Add a new transaction
  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  // Delete a transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  // Edit a transaction
  const editTransaction = (id, newText, newAmount, newCategory, newDate) => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === id
          ? {
              ...transaction,
              text: newText,
              amount: +newAmount,
              category: newCategory,
              date: newDate,
            }
          : transaction
      )
    );
  };

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === 'income') return transaction.amount > 0;
    if (filter === 'expense') return transaction.amount < 0;
    return true;
  });

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mb-4 text-red-500 hover:text-red-700 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            />
          </svg>
          Logout
        </button>

        <h1 className="text-2xl font-bold text-center mb-4">Expense Tracker</h1>

        {/* Balance Summary */}
        <BalanceSummary transactions={transactions} />

        {/* Filter Buttons */}
        <FilterButtons filter={filter} setFilter={setFilter} />

        {/* Transaction History (Collapsible) */}
        <div className="mb-6">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            {showHistory ? 'Hide History' : 'Show History'}
          </button>
          {showHistory && (
            <TransactionList
              transactions={filteredTransactions}
              deleteTransaction={deleteTransaction}
              editTransaction={editTransaction}
            />
          )}
        </div>

        {/* Add Transaction Form (Collapsible) */}
        <div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
          >
            {showAddForm ? 'Hide Add Transaction' : 'Add Transaction'}
          </button>
          {showAddForm && (
            <AddTransactionForm
              text={text}
              setText={setText}
              amount={amount}
              setAmount={setAmount}
              category={category}
              setCategory={setCategory}
              date={date}
              setDate={setDate}
              addTransaction={addTransaction}
            />
          )}
        </div>

        {/* Export Button */}
        <ExportButton transactions={transactions} />
      </div>
    </div>
  );
};

export default ExpenseTracker;