import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductDetail = ({ product }) => {
  const navigate = useNavigate();

  if (!product) return null;

  return (
    <div className="product-detail bg-white shadow-md rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-blue-600 mb-4">
        Chi tiết sản phẩm
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-700"><strong>ID:</strong> {product.productID}</p>
          <p className="text-gray-700"><strong>Tên sản phẩm:</strong> {product.productName}</p>
          <p className="text-gray-700"><strong>Đơn vị tính:</strong> {product.unit?.unitName || '—'}</p>
        </div>
        <div>
          <p className="text-gray-700"><strong>Giá nhập:</strong> {product.importPrice.toLocaleString()} VND</p>
          <p className="text-gray-700"><strong>Giá xuất:</strong> {product.exportPrice.toLocaleString()} VND</p>
          <p className="text-gray-700"><strong>Tồn kho:</strong> {product.inventoryQuantity}</p>
        </div>
      </div>

      <div className="mt-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={() => navigate(`/products/edit/${product.productID}`)}
        >
          Chỉnh sửa
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;