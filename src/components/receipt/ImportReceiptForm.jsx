import React, { useState, useContext } from 'react';
import { ProductContext } from '../../App';
import { FiX, FiCalendar, FiDollarSign, FiPackage, FiHash, FiPlus } from 'react-icons/fi';

const ImportReceiptForm = ({ onCancel, onSuccess }) => {
  const { products, units } = useContext(ProductContext);
  const [receiptData, setReceiptData] = useState({
    dateReceipt: new Date().toISOString().split('T')[0],
    details: [{ productID: '', unitID: '', quantityImport: 0, importPrice: 0, intoMoney: 0 }],
  });
  const [errors, setErrors] = useState({});

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!receiptData.dateReceipt) newErrors.dateReceipt = 'Ngày lập phiếu không được để trống';
    
    receiptData.details.forEach((detail, index) => {
      if (!detail.productID) newErrors[`productID_${index}`] = 'Vui lòng chọn sản phẩm';
      if (!detail.unitID) newErrors[`unitID_${index}`] = 'Vui lòng chọn đơn vị';
      if (!detail.quantityImport || detail.quantityImport <= 0) 
        newErrors[`quantityImport_${index}`] = 'Số lượng phải lớn hơn 0';
      if (!detail.importPrice || detail.importPrice <= 0) 
        newErrors[`importPrice_${index}`] = 'Giá nhập phải lớn hơn 0';
    });
    
    return newErrors;
  };

  // Handle input change
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDetails = [...receiptData.details];
    
    updatedDetails[index] = { 
      ...updatedDetails[index], 
      [name]: value 
    };
    
    // Auto calculate intoMoney
    if (name === 'quantityImport' || name === 'importPrice') {
      updatedDetails[index].intoMoney = Math.max(
        0, 
        parseInt(updatedDetails[index].quantityImport || 0) * 
        parseInt(updatedDetails[index].importPrice || 0)
      );
    }
    
    setReceiptData({ ...receiptData, details: updatedDetails });
    setErrors({ ...errors, [`${name}_${index}`]: null });
  };

  // Add new detail row
  const addDetail = () => {
    setReceiptData({
      ...receiptData,
      details: [
        ...receiptData.details, 
        { productID: '', unitID: '', quantityImport: 0, importPrice: 0, intoMoney: 0 }
      ],
    });
  };

  // Remove detail row
  const removeDetail = (index) => {
    const updatedDetails = receiptData.details.filter((_, i) => i !== index);
    setReceiptData({ ...receiptData, details: updatedDetails });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Calculate total price
    const totalPrice = receiptData.details.reduce(
      (sum, detail) => sum + detail.intoMoney, 0
    );
    
    // Prepare data for success callback
    const successData = {
      dateReceipt: receiptData.dateReceipt,
      totalPrice: totalPrice,
      details: receiptData.details.map((detail, index) => ({
        stt: index + 1,
        productID: parseInt(detail.productID),
        productName: products.find(p => p.productID === parseInt(detail.productID))?.productName || '',
        unitID: parseInt(detail.unitID),
        unitName: units.find(u => u.unitID === parseInt(detail.unitID))?.unitName || '',
        quantityImport: parseInt(detail.quantityImport),
        importPrice: parseInt(detail.importPrice),
        intoMoney: parseInt(detail.intoMoney),
      })),
    };
    
    onSuccess(successData);
    
    // Reset form
    setReceiptData({ 
      dateReceipt: new Date().toISOString().split('T')[0], 
      details: [{ productID: '', unitID: '', quantityImport: 0, importPrice: 0, intoMoney: 0 }] 
    });
    setErrors({});
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-white text-gray-800 p-8 rounded-2xl w-[700px] shadow-2xl transform transition-all duration-300 scale-100 hover:scale-[1.02] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiCalendar className="text-blue-600" />
            Thêm Phiếu Nhập Mới
          </h2>
          <button 
            onClick={onCancel} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <FiX className="text-gray-500 hover:text-gray-700 text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiCalendar className="text-gray-400" />
            </div>
            <input
              type="date"
              name="dateReceipt"
              value={receiptData.dateReceipt}
              onChange={(e) => setReceiptData({ ...receiptData, dateReceipt: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
            />
            {errors.dateReceipt && (
              <p className="text-red-500 text-sm mt-1">{errors.dateReceipt}</p>
            )}
          </div>

          {/* Product Details List */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Danh sách mặt hàng</h3>
            
            {receiptData.details.map((detail, index) => (
              <div key={index} className="border-t border-gray-200 pt-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {/* Product Selection */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPackage className="text-gray-400" />
                    </div>
                    <select
                      name="productID"
                      value={detail.productID}
                      onChange={(e) => handleChange(e, index)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    >
                      <option value="">Chọn sản phẩm</option>
                      {products.map(product => (
                        <option key={product.productID} value={product.productID}>
                          {product.productName}
                        </option>
                      ))}
                    </select>
                    {errors[`productID_${index}`] && (
                      <p className="text-red-500 text-sm mt-1">{errors[`productID_${index}`]}</p>
                    )}
                  </div>

                  {/* Unit Selection */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPackage className="text-gray-400" />
                    </div>
                    <select
                      name="unitID"
                      value={detail.unitID}
                      onChange={(e) => handleChange(e, index)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    >
                      <option value="">Chọn đơn vị</option>
                      {units.map(unit => (
                        <option key={unit.unitID} value={unit.unitID}>
                          {unit.unitName}
                        </option>
                      ))}
                    </select>
                    {errors[`unitID_${index}`] && (
                      <p className="text-red-500 text-sm mt-1">{errors[`unitID_${index}`]}</p>
                    )}
                  </div>

                  {/* Quantity Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiHash className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="quantityImport"
                      value={detail.quantityImport}
                      onChange={(e) => handleChange(e, index)}
                      min="1"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      placeholder="Số lượng"
                    />
                    {errors[`quantityImport_${index}`] && (
                      <p className="text-red-500 text-sm mt-1">{errors[`quantityImport_${index}`]}</p>
                    )}
                  </div>

                  {/* Price Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiDollarSign className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="importPrice"
                      value={detail.importPrice}
                      onChange={(e) => handleChange(e, index)}
                      min="0"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      placeholder="Giá nhập"
                    />
                    {errors[`importPrice_${index}`] && (
                      <p className="text-red-500 text-sm mt-1">{errors[`importPrice_${index}`]}</p>
                    )}
                  </div>

                  {/* Total Money (auto calculated) */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiDollarSign className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      value={detail.intoMoney}
                      readOnly
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Remove button for extra rows */}
                {receiptData.details.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDetail(index)}
                    className="mt-2 text-red-500 hover:text-red-600 text-sm font-medium transition-colors duration-200"
                  >
                    Xóa mặt hàng
                  </button>
                )}
              </div>
            ))}

            {/* Add more products button */}
            <button
              type="button"
              onClick={addDetail}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-medium flex items-center gap-2"
            >
              <FiPlus />
              Thêm mặt hàng
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end mt-8 space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium border border-gray-300"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              Thêm phiếu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImportReceiptForm;