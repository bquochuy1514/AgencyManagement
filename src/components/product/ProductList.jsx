// ProductList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ products, onShowForm }) => {
  const navigate = useNavigate();

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
            {products.map((product) => (
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
                    onClick={() => navigate(`/products/edit/${product.productID}`)}
                    className="text-yellow-600 hover:text-yellow-800 mr-2"
                  >
                    Sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;