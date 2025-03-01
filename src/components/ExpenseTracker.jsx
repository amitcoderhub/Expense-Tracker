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
  const [filter, setFilter] = useState('all'); // 'income', 'expense', or 'all'
  const [showHistory, setShowHistory] = useState(false); // Toggle transaction history
  const [showAddForm, setShowAddForm] = useState(false); // Toggle add transaction form
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
  const addTransaction = (e) => {
    e.preventDefault();
    if (!text || !amount || !category || !date) return;

    const newTransaction = {
      id: Math.floor(Math.random() * 1000000),
      text,
      amount: +amount,
      category,
      date,
    };

    setTransactions([...transactions, newTransaction]);
    setText('');
    setAmount(0);
    setCategory('');
    setDate(new Date().toISOString().split('T')[0]);
    setShowAddForm(false); // Collapse the form after adding
  };

  // Delete a transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === 'income') return transaction.amount > 0;
    if (filter === 'expense') return transaction.amount < 0;
    return true; // Show all
  });

  // Handle back button click
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-4 text-blue-500 hover:text-blue-700 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back
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
          {showHistory && <TransactionList transactions={filteredTransactions} deleteTransaction={deleteTransaction} />}
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