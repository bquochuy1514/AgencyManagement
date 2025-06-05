// ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createProduct, getProductById } from '../../services/productService';

const ProductForm = ({ onCancel, setShowForm, products, setProducts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    productName: '',
    unit: '',
    importPrice: '',
    exportPrice: '',
    inventoryQuantity: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const product = await getProductById(id);
          setProductData({
            productName: product.productName,
            unit: product.unit.unitName,
            importPrice: product.importPrice,
            exportPrice: product.exportPrice,
            inventoryQuantity: product.inventoryQuantity,
          });
        } catch (err) {
          setError(err.message || 'Không thể tải dữ liệu sản phẩm');
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = await createProduct({
        productName: productData.productName,
        unit: productData.unit,
        importPrice: parseInt(productData.importPrice),
        exportPrice: parseInt(productData.exportPrice),
        inventoryQuantity: parseInt(productData.inventoryQuantity),
      });
      setProducts([...products, newProduct]); // Thêm sản phẩm mới vào danh sách
      setProductData({
        productName: '',
        unit: '',
        importPrice: '',
        exportPrice: '',
        inventoryQuantity: '',
      });
      setSuccess('Thêm sản phẩm thành công!');
      setError(null);
      setShowForm(false); // Ẩn form sau khi thêm thành công
    } catch (err) {
      setError(err.message || 'Không thể thêm sản phẩm');
      setSuccess(null);
      setShowForm(false); // Ẩn form ngay cả khi có lỗi
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{id ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">{success}</div>
      )}
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
          <input
            type="text"
            name="productName"
            value={productData.productName}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
            placeholder="Nhập tên sản phẩm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Đơn vị</label>
          <input
            type="text"
            name="unit"
            value={productData.unit}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
            placeholder="Nhập đơn vị"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Giá nhập</label>
            <input
              type="number"
              name="importPrice"
              value={productData.importPrice}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Nhập giá nhập"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Giá xuất</label>
            <input
              type="number"
              name="exportPrice"
              value={productData.exportPrice}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Nhập giá xuất"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Số lượng tồn kho</label>
          <input
            type="number"
            name="inventoryQuantity"
            value={productData.inventoryQuantity}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
            placeholder="Nhập số lượng"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            {id ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;