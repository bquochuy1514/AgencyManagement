import React, { useState } from 'react';

const ProductFilter = ({ units = [], onFilter }) => {
  const [filters, setFilters] = useState({
    productName: '',
    unit: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onFilter) {
      onFilter(filters);
    }
  };

  const handleReset = () => {
    const resetFilters = { productName: '', unit: '' };
    setFilters(resetFilters);
    if (onFilter) {
      onFilter(resetFilters);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-filter flex flex-col md:flex-row gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
      <div className="filter-group flex-1">
        <input
          type="text"
          name="productName"
          value={filters.productName}
          onChange={handleChange}
          placeholder="Tìm theo tên sản phẩm..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="filter-group flex-1">
        <select
          name="unit"
          value={filters.unit}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tất cả đơn vị</option>
          {units.map(unit => (
            <option key={unit.unitID} value={unit.unitID}>
              {unit.unitName}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-actions flex gap-2">
        <button 
          type="submit" 
          className="btn-filter bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Lọc
        </button>
        <button 
          type="button" 
          className="btn-reset bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
          onClick={handleReset}
        >
          Xóa lọc
        </button>
      </div>
    </form>
  );
};

export default ProductFilter;