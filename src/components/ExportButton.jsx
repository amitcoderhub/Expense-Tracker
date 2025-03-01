import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ExportButton = ({ transactions }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  const exportToCSV = () => {
    const headers = ['Text', 'Amount', 'Category', 'Date'];
    const csvContent = [
      headers.join(','),
      ...transactions.map((transaction) =>
        [transaction.text, transaction.amount, transaction.category, transaction.date].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'transactions.csv';
    link.click();
  };

  return (
    <button
      onClick={exportToCSV}
      className={`w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 mt-4 ${isDarkTheme ? 'bg-green-600' : 'bg-green-500'}`}
    >
      Export to CSV
    </button>
  );
};

export default ExportButton;