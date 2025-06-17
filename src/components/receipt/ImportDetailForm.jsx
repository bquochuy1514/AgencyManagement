import React, { useState, useContext } from 'react';
import { FiX, FiPackage, FiDollarSign, FiPlus, FiHash } from 'react-icons/fi';
import { ProductContext } from '../../App';
import { toast } from 'react-toastify';

const ImportDetailForm = ({ receiptId, receipt, onClose, onAddDetail }) => {
  const { products, units } = useContext(ProductContext);
  const [formData, setFormData] = useState({
    productID: '',
    unitID: '',
    quantityImport: '',
    importPrice: '',
    intoMoney: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    
    // Auto calculate intoMoney
    if (name === 'quantityImport' || name === 'importPrice') {
      updatedFormData.intoMoney = (
        parseFloat(updatedFormData.quantityImport || 0) * 
        parseFloat(updatedFormData.importPrice || 0)
      ).toFixed(2);
    }
    
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate
    if (!formData.productID || !formData.unitID || !formData.quantityImport || !formData.importPrice) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      setLoading(false);
      return;
    }

    const product = products.find(p => p.productID === parseInt(formData.productID));
    const unit = units.find(u => u.unitID === parseInt(formData.unitID));
    
    const newDetail = {
      productID: parseInt(formData.productID),
      productName: product?.productName || '',
      unitID: parseInt(formData.unitID),
      unitName: unit?.unitName || '',
      quantityImport: parseFloat(formData.quantityImport),
      importPrice: parseFloat(formData.importPrice),
      intoMoney: parseFloat(formData.intoMoney),
    };

    await onAddDetail(newDetail);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-white text-gray-800 p-8 rounded-2xl w-[500px] shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiPlus className="text-blue-600" />
            Thêm Chi Tiết Phiếu Nhập #{receiptId}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            disabled={loading}
          >
            <FiX className="text-gray-500 hover:text-gray-700 text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Selection */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiPackage className="text-gray-400" />
            </div>
            <select
              name="productID"
              value={formData.productID}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
              required
              disabled={loading}
            >
              <option value="">Chọn sản phẩm</option>
              {products.map(product => (
                <option key={product.productID} value={product.productID}>
                  {product.productName}
                </option>
              ))}
            </select>
          </div>

          {/* Unit Selection */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiPackage className="text-gray-400" />
            </div>
            <select
              name="unitID"
              value={formData.unitID}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
              required
              disabled={loading}
            >
              <option value="">Chọn đơn vị tính</option>
              {units.map(unit => (
                <option key={unit.unitID} value={unit.unitID}>
                  {unit.unitName}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiHash className="text-gray-400" />
            </div>
            <input
              type="number"
              name="quantityImport"
              value={formData.quantityImport}
              onChange={handleChange}
              min="1"
              step="1"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
              placeholder="Số lượng"
              required
              disabled={loading}
            />
          </div>

          {/* Price */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiDollarSign className="text-gray-400" />
            </div>
            <input
              type="number"
              name="importPrice"
              value={formData.importPrice}
              onChange={handleChange}
              min="0"
              step="1000"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
              placeholder="Giá nhập"
              required
              disabled={loading}
            />
          </div>

          {/* Total Money */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiDollarSign className="text-gray-400" />
            </div>
            <input
              type="number"
              name="intoMoney"
              value={formData.intoMoney}
              readOnly
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              placeholder="Thành tiền"
            />
          </div>

          <div className="flex justify-end mt-8 space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium border border-gray-300"
              disabled={loading}
            >
              Hủy
            </button>
            <button
              type="submit"
              className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center gap-2 ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : 'Thêm chi tiết'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImportDetailForm;