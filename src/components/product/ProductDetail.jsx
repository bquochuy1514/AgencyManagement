
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../services/productService';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || 'Không thể tải chi tiết sản phẩm');
      }
    };
    fetchProduct();
  }, [id]);

  if (!product && !error) return <p>Đang tải...</p>;

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Chi tiết sản phẩm</h2>
      {error && <p className="text-red-500">{error}</p>}
      {product && (
        <div className="bg-white p-4 border rounded">
          <p><strong>Mã:</strong> {product.productID}</p>
          <p><strong>Tên:</strong> {product.productName}</p>
          <p><strong>Đơn vị:</strong> {product.unit.unitName}</p>
          <p><strong>Giá nhập:</strong> {product.importPrice}</p>
          <p><strong>Giá xuất:</strong> {product.exportPrice}</p>
          <p><strong>Số lượng tồn kho:</strong> {product.inventoryQuantity}</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-gray-500 text-white px-4 py-2 mt-4 rounded"
          >
            Quay lại
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;