import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import { unitService } from '../../services/unitService';
import { useNavigate } from 'react-router-dom';
import ProductFilter from './ProductFilter';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, unitsData] = await Promise.all([
          productService.getAllProducts(),
          unitService.getAllUnits()
        ]);
        
        setProducts(productsData);
        setFilteredProducts(productsData);
        setUnits(unitsData);
        setLoading(false);
      } catch (err) {
        setError('Không thể tải dữ liệu: ' + err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilter = (filters) => {
    const filtered = products.filter(product => {
      return (
        (!filters.productName || product.productName.toLowerCase().includes(filters.productName.toLowerCase())) &&
        (!filters.unit || product.unit?.unitID === filters.unit)
      );
    });
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value || 0);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <div className="loading text-center py-10 text-gray-600">Đang tải dữ liệu...</div>;
  if (error) return <div className="error text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="product-management container mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Quản lý Sản phẩm</h2>
      
      <ProductFilter 
        units={units} 
        onFilter={handleFilter} 
        className="mb-6"
      />
      
      <button 
        className="btn-add bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-6"
        onClick={() => navigate('/products/add')}
      >
        + Thêm Sản phẩm mới
      </button>

      <div className="product-table-container overflow-x-auto">
        {paginatedProducts.length === 0 ? (
          <p className="text-center py-4 text-gray-500">Không có sản phẩm nào được tìm thấy.</p>
        ) : (
          <table className="product-table w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-2 border-b">ID</th>
                <th className="p-2 border-b">Tên sản phẩm</th>
                <th className="p-2 border-b">Đơn vị tính</th>
                <th className="p-2 border-b">Giá nhập</th>
                <th className="p-2 border-b">Giá xuất</th>
                <th className="p-2 border-b">Tồn kho</th>
                <th className="p-2 border-b">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map(product => (
                <tr key={product.productID} className="hover:bg-gray-100">
                  <td className="p-2 border-b">{product.productID}</td>
                  <td className="p-2 border-b">{product.productName}</td>
                  <td className="p-2 border-b">{product.unit?.unitName || 'Không rõ'}</td>
                  <td className="p-2 border-b">{formatCurrency(product.importPrice)}</td>
                  <td className="p-2 border-b">{formatCurrency(product.exportPrice)}</td>
                  <td className="p-2 border-b">{product.inventoryQuantity ?? 0}</td>
                  <td className="p-2 border-b">
                    <button 
                      className="btn-edit bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
                      onClick={() => navigate(`/products/edit/${product.productID}`)}
                    >
                      Sửa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination flex justify-center items-center gap-2 mt-4">
          <button 
            disabled={currentPage === 1} 
            className="px-3 py-1 bg-gray-300 rounded disabled:bg-gray-200"
            onClick={() => setCurrentPage(p => p - 1)}
          >
            &lt; Trước
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          
          <button 
            disabled={currentPage === totalPages} 
            className="px-3 py-1 bg-gray-300 rounded disabled:bg-gray-200"
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Sau &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;