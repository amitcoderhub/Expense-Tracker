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
  const [customCategory, setCustomCategory] = useState(''); // Custom category for "Other"
  const { isDarkTheme } = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form refresh
    const transactionAmount = isExpense ? -Math.abs(amount) : Math.abs(amount);
    addTransaction({
      text,
      amount: transactionAmount,
      category: category === 'Other' ? customCategory : category,
      date,
    });
    // Clear form fields
    setText('');
    setAmount(0);
    setCategory('');
    setCustomCategory('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 rounded-lg shadow-md max-w-md mx-auto bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-800 dark:to-gray-900"
    >
      <div>
        <label htmlFor="text" className={`block font-medium ${isDarkTheme ? 'text-white' : 'text-black'}`}>Description</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter description..."
          className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
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
          className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          required
        />
      </div>

      <div>
        <label htmlFor="category" className={`block font-medium ${isDarkTheme ? 'text-white' : 'text-black'}`}>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          required
        >
          <option value="" disabled>Select Category</option>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Salary">Salary</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
        {category === 'Other' && (
          <input
            type="text"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            placeholder="Enter custom category..."
            className={`w-full p-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-400 ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
            required
          />
        )}
      </div>

      <div>
        <label htmlFor="date" className={`block font-medium ${isDarkTheme ? 'text-white' : 'text-black'}`}>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          required
        />
      </div>

      <div>
        <label className={`block font-medium ${isDarkTheme ? 'text-white' : 'text-black'}`}>Type</label>
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={() => setIsExpense(false)}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              !isExpense ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            Income
          </button>
          <button
            type="button"
            onClick={() => setIsExpense(true)}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              isExpense ? 'bg-red-500 text-white' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            Expense
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default AddTransactionForm;
