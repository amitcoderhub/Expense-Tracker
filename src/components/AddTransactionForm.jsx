import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const AddTransactionForm = ({
  text,
  setText,
  amount,
  setAmount,
  category,
  setCategory,
  date,
  setDate,
  addTransaction,
}) => {
  const [isExpense, setIsExpense] = useState(false); // Track if it's an expense
  const { isDarkTheme } = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    const transactionAmount = isExpense ? -Math.abs(amount) : Math.abs(amount); // Ensure expense is negative
    addTransaction({
      text,
      amount: transactionAmount,
      category,
      date,
    });
    // Clear form fields after submission
    setText('');
    setAmount(0);
    setCategory('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="text" className={`block font-medium ${isDarkTheme ? 'text-white' : 'text-black'}`}>Description</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter description..."
          className={`w-full p-2 border rounded-lg ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          required
        />
      </div>
      <div>
        <label htmlFor="amount" className={`block font-medium ${isDarkTheme ? 'text-white' : 'text-black'}`}>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount..."
          className={`w-full p-2 border rounded-lg ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          required
        />
      </div>
      <div>
        <label htmlFor="category" className={`block font-medium ${isDarkTheme ? 'text-white' : 'text-black'}`}>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`w-full p-2 border rounded-lg ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          required
        >
          <option value="" disabled>Select Category</option>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Salary">Salary</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="date" className={`block font-medium ${isDarkTheme ? 'text-white' : 'text-black'}`}>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={`w-full p-2 border rounded-lg ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          required
        />
      </div>
      <div>
        <label className={`block font-medium ${isDarkTheme ? 'text-white' : 'text-black'}`}>Type</label>
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={() => setIsExpense(false)}
            className={`px-4 py-2 rounded-lg ${
              !isExpense ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Income
          </button>
          <button
            type="button"
            onClick={() => setIsExpense(true)}
            className={`px-4 py-2 rounded-lg ${
              isExpense ? 'bg-red-500 text-white' : 'bg-gray-200'
            }`}
          >
            Expense
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default AddTransactionForm;