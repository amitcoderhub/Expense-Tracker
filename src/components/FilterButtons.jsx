const FilterButtons = ({ filter, setFilter }) => {
    return (
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('income')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'income' ? 'bg-green-500 text-white' : 'bg-gray-200'
          }`}
        >
          Income
        </button>
        <button
          onClick={() => setFilter('expense')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-200'
          }`}
        >
          Expense
        </button>
      </div>
    );
  };
  
  export default FilterButtons;