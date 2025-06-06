
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProduct } from '../../services/productService';

const ProductList = ({ products, setProducts, onShowForm }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleDelete = async (productId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await deleteProduct(productId);
        setProducts(products.filter((product) => product.productID !== productId));
      } catch (err) {
        alert('Không thể xóa sản phẩm: ' + err.message);
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
        <h2 className="text-xl font-semibold">Danh sách Sản phẩm</h2>
        <button
          onClick={onShowForm}
          className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition"
        >
          Thêm sản phẩm mới
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đơn vị</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá nhập</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá xuất</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tồn kho</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">

            {currentItems.map((product) => (
              <tr key={product.productID} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">{product.productID}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.productName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.unit.unitName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.importPrice}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.exportPrice}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.inventoryQuantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => navigate(`/products/detail/${product.productID}`)}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    Xem
                  </button>
                  <button
                    onClick={() => handleDelete(product.productID)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Xóa

                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {products.length > itemsPerPage && (
        <div className="p-4 flex justify-center items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Trang trước
          </button>
          <span className="text-gray-700">Trang {currentPage} / {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
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