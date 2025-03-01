import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const TransactionList = ({ transactions, deleteTransaction, editTransaction }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [editedAmount, setEditedAmount] = useState(0);
  const [editedCategory, setEditedCategory] = useState('');
  const [editedDate, setEditedDate] = useState('');
  const { isDarkTheme } = useContext(ThemeContext);

  const handleEdit = (transaction) => {
    setEditingId(transaction.id);
    setEditedText(transaction.text);
    setEditedAmount(transaction.amount);
    setEditedCategory(transaction.category);
    setEditedDate(transaction.date);
  };

  const handleSave = (id) => {
    editTransaction(id, editedText, editedAmount, editedCategory, editedDate);
    setEditingId(null); // Exit edit mode
  };

  return (
    <ul className="space-y-2 mt-4">
      {transactions.map((transaction) => (
        <li
          key={transaction.id}
          className={`flex flex-col p-3 rounded-lg ${
            transaction.amount < 0 ? 'bg-red-50' : 'bg-green-50'
          }`}
        >
          {editingId === transaction.id ? (
            <>
              {/* Editable Fields */}
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                placeholder="Text"
                className={`w-full p-1 border rounded-lg mb-2 ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
              />
              <input
                type="number"
                value={editedAmount}
                onChange={(e) => setEditedAmount(e.target.value)}
                placeholder="Amount"
                className={`w-full p-1 border rounded-lg mb-2 ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
              />
              <select
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
                className={`w-full p-1 border rounded-lg mb-2 ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
              >
                <option value="" disabled>Select Category</option>
                <option value="Food">Food</option>
                <option value="Rent">Rent</option>
                <option value="Salary">Salary</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="date"
                value={editedDate}
                onChange={(e) => setEditedDate(e.target.value)}
                className={`w-full p-1 border rounded-lg mb-2 ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
              />
              {/* Save Button */}
              <button
                onClick={() => handleSave(transaction.id)}
                className="bg-green-500 text-white p-1 rounded-lg hover:bg-green-600"
              >
                Save
              </button>
            </>
          ) : (
            <>
              {/* Display Transaction Details */}
              <div className="flex justify-between">
                <span className={isDarkTheme ? 'text-white' : 'text-black'}>{transaction.text}</span>
                <span className={`font-semibold ${
                  transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
                }`}>
                  ${Math.abs(transaction.amount).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={isDarkTheme ? 'text-white' : 'text-black'}>{transaction.category}</span>
                <span className={isDarkTheme ? 'text-white' : 'text-black'}>{transaction.date}</span>
              </div>
              {/* Edit and Delete Buttons */}
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={() => handleEdit(transaction)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTransaction(transaction.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;