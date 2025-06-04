import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import { useParams, useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [units, setUnits] = useState([]);
  const [formData, setFormData] = useState({
    productName: '',
    unit: '',
    importPrice: 0,
    exportPrice: 0,
    inventoryQuantity: 0
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const unitsData = await productService.getAllUnits();
        setUnits(unitsData);

        if (id) {
          const product = await productService.getProductById(id);
          if (product) {
            setFormData({
              productName: product.productName || '',
              unit: product.unit?.unitID || '',
              importPrice: product.importPrice || 0,
              exportPrice: product.exportPrice || 0,
              inventoryQuantity: product.inventoryQuantity || 0
            });
          }
        }
      } catch (err) {
        console.error('Error loading data:', err);
        alert('Không thể tải dữ liệu sản phẩm');
      }
    };

    fetchData();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!formData.productName.trim()) newErrors.productName = "Tên sản phẩm bắt buộc nhập";
    if (!formData.unit) newErrors.unit = "Vui lòng chọn đơn vị tính";
    if (formData.importPrice <= 0) newErrors.importPrice = "Giá nhập phải lớn hơn 0";
    if (formData.exportPrice < 0) newErrors.exportPrice = "Giá xuất không được âm";
    if (formData.inventoryQuantity < 0) newErrors.inventoryQuantity = "Số lượng tồn không được âm";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const payload = {
        productName: formData.productName,
        unit: { unitID: formData.unit },
        importPrice: formData.importPrice,
        exportPrice: formData.exportPrice,
        inventoryQuantity: formData.inventoryQuantity
      };

      if (id) {
        await productService.updateProduct(id, payload);
        navigate('/products', { state: { message: 'Cập nhật sản phẩm thành công' } });
      } else {
        await productService.createProduct(payload);
        navigate('/products', { state: { message: 'Thêm sản phẩm thành công' } });
      }
    } catch (err) {
      console.error('Error saving product:', err);
      alert('Có lỗi xảy ra khi lưu sản phẩm');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('Price') || name.includes('Quantity') 
        ? parseInt(value) || 0 
        : value
    }));
  };

  return (
    <div className="product-form-container max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {id ? 'Cập nhật Sản phẩm' : 'Thêm Sản phẩm mới'}
      </h2>

      <form onSubmit={handleSubmit} className="product-form space-y-6">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Tên sản phẩm <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.productName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.productName && <span className="text-red-500 text-sm mt-1 block">{errors.productName}</span>}
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Đơn vị tính <span className="text-red-500">*</span>
          </label>
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.unit ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">-- Chọn đơn vị tính --</option>
            {units.map(unit => (
              <option key={unit.unitID} value={unit.unitID}>
                {unit.unitName}
              </option>
            ))}
          </select>
          {errors.unit && <span className="text-red-500 text-sm mt-1 block">{errors.unit}</span>}
        </div>

        <div className="form-row flex space-x-4">
          <div className="form-group flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Giá nhập (VND) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="importPrice"
              value={formData.importPrice}
              onChange={handleChange}
              min="1"
              className={`mt-1 block w-full p-2 border ${errors.importPrice ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.importPrice && <span className="text-red-500 text-sm mt-1 block">{errors.importPrice}</span>}
          </div>

          <div className="form-group flex-1">
            <label className="block text-sm font-medium text-gray-700">Giá xuất (VND)</label>
            <input
              type="number"
              name="exportPrice"
              value={formData.exportPrice}
              onChange={handleChange}
              min="0"
              className={`mt-1 block w-full p-2 border ${errors.exportPrice ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.exportPrice && <span className="text-red-500 text-sm mt-1 block">{errors.exportPrice}</span>}
          </div>
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Số lượng tồn kho</label>
          <input
            type="number"
            name="inventoryQuantity"
            value={formData.inventoryQuantity}
            onChange={handleChange}
            min="0"
            className={`mt-1 block w-full p-2 border ${errors.inventoryQuantity ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.inventoryQuantity && <span className="text-red-500 text-sm mt-1 block">{errors.inventoryQuantity}</span>}
        </div>

        <div className="form-actions flex justify-end space-x-4">
          <button 
            type="button" 
            className="btn-cancel bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
            onClick={() => navigate('/products')}
          >
            Hủy bỏ
          </button>
          <button 
            type="submit" 
            className="btn-save bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Đang lưu...' : (id ? 'Cập nhật' : 'Thêm mới')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;