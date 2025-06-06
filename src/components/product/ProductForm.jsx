import React, { useState } from 'react';
import { createProduct } from '../../services/productService';

const ProductForm = ({ onCancel, setShowForm, products, setProducts }) => {
  const [productData, setProductData] = useState({
    productName: '',
    unit: '',
    importPrice: '',
    exportPrice: '',
    inventoryQuantity: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!productData.productName) newErrors.productName = 'Tên sản phẩm không được để trống';
    if (!productData.unit) newErrors.unit = 'Đơn vị không được để trống';
    if (!productData.importPrice || productData.importPrice < 0)
      newErrors.importPrice = 'Giá nhập phải là số không âm';
    if (!productData.exportPrice || productData.exportPrice < 0)
      newErrors.exportPrice = 'Giá xuất phải là số không âm';
    if (!productData.inventoryQuantity || productData.inventoryQuantity < 0)
      newErrors.inventoryQuantity = 'Số lượng tồn kho phải là số không âm';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const newProduct = await createProduct({
        productName: productData.productName,
        unit: productData.unit,
        importPrice: parseInt(productData.importPrice),
        exportPrice: parseInt(productData.exportPrice),
        inventoryQuantity: parseInt(productData.inventoryQuantity),
      });
      if (newProduct && newProduct.productID) {
        const formattedProduct = {
          productID: newProduct.productID,
          productName: newProduct.productName,
          unit: { unitName: newProduct.unit },
          importPrice: newProduct.importPrice,
          exportPrice: newProduct.exportPrice,
          inventoryQuantity: newProduct.inventoryQuantity,
        };
        setProducts([...products, formattedProduct]);
        setSuccess('Thêm sản phẩm thành công!');
      } else {
        throw new Error('Dữ liệu sản phẩm mới không hợp lệ');
      }
      setProductData({
        productName: '',
        unit: '',
        importPrice: '',
        exportPrice: '',
        inventoryQuantity: '',
      });
      setErrors({});
      setShowForm(false);
    } catch (err) {
      setErrors({ general: err.message || 'Không thể thêm sản phẩm' });
      setSuccess(null);
      setShowForm(false);
    }
  };

  return (
    <div className="bg-[#2a3b4c] rounded-lg shadow-md p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">Thêm Sản Phẩm Mới</h2>
      {success && (
        <div className="bg-green-900/30 border border-green-500 text-green-300 px-4 py-2 rounded mb-4">
          {success}
        </div>
      )}
      {errors.general && (
        <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-2 rounded mb-4">
          {errors.general}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Tên sản phẩm</label>
          <input
            type="text"
            name="productName"
            value={productData.productName}
            onChange={handleChange}
            className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
            placeholder="Nhập tên sản phẩm"
          />
          {errors.productName && <p className="text-red-400 text-sm mt-1">{errors.productName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Đơn vị</label>
          <input
            type="text"
            name="unit"
            value={productData.unit}
            onChange={handleChange}
            className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
            placeholder="Nhập đơn vị"
          />
          {errors.unit && <p className="text-red-400 text-sm mt-1">{errors.unit}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Giá nhập</label>
            <input
              type="number"
              name="importPrice"
              value={productData.importPrice}
              onChange={handleChange}
              className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
              placeholder="Nhập giá nhập"
            />
            {errors.importPrice && <p className="text-red-400 text-sm mt-1">{errors.importPrice}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Giá xuất</label>
            <input
              type="number"
              name="exportPrice"
              value={productData.exportPrice}
              onChange={handleChange}
              className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
              placeholder="Nhập giá xuất"
            />
            {errors.exportPrice && <p className="text-red-400 text-sm mt-1">{errors.exportPrice}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Số lượng tồn kho</label>
          <input
            type="number"
            name="inventoryQuantity"
            value={productData.inventoryQuantity}
            onChange={handleChange}
            className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
            placeholder="Nhập số lượng"
          />
          {errors.inventoryQuantity && <p className="text-red-400 text-sm mt-1">{errors.inventoryQuantity}</p>}
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="w-full bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-700 transition text-white"
          >
            Thêm sản phẩm
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full bg-gray-600 px-4 py-2 rounded-md hover:bg-gray-700 transition text-white"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;