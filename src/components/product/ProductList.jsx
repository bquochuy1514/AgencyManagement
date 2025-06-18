
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ products, setProducts, onShowForm }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleDelete = (productId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      setProducts(products.filter((product) => product.productID !== productId));
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6 bg-[#1a2634] rounded-lg min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">QUẢN LÝ SẢN PHẨM</h2>
          <p className="text-sm text-gray-400">Quản lý danh sách sản phẩm và thông tin chi tiết</p>
        </div>
        <button
          onClick={onShowForm}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
        >
          + Thêm Sản Phẩm Mới
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-[#2a3b4c] text-gray-300">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Mã</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Tên</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Đơn vị</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Giá nhập</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Giá xuất</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Tồn kho</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700 text-gray-200">
            {currentItems.map((product) => (
              <tr key={product.productID} className="border-t border-gray-700 text-gray-200">
                <td className="px-4 py-3">{product.productID}</td>
                <td className="px-4 py-3">{product.productName}</td>
                <td className="px-4 py-3">{product.unit.unitName}</td>
                <td className="px-4 py-3">
                  {new Intl.NumberFormat('vi-VN').format(product.importPrice)} đ
                </td>
                <td className="px-4 py-3">
                  {new Intl.NumberFormat('vi-VN').format(product.exportPrice)} đ
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      product.inventoryQuantity > 0
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {product.inventoryQuantity > 0 ? 'Còn hàng' : 'Hết hàng'}
                  </span>
                </td>
                <td className="px-4 py-3 flex space-x-2">
                  <button
                    onClick={() => navigate(`/products/detail/${product.productID}`)}
                    className="text-blue-400 hover:text-blue-500"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(product.productID)}
                    className="text-red-400 hover:text-red-500"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M3 7h18"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {products.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md text-sm ${
              currentPage === 1
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Trang trước
          </button>
          <span className="text-gray-400 text-sm">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md text-sm ${
              currentPage === totalPages
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Trang sau
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;