import React, { useState } from 'react';
import { addImportReceipt } from '../../services/receiptService';

const ImportReceiptForm = ({ onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    dateReceipt: new Date().toISOString().split('T')[0], // Mặc định ngày hiện tại
    totalPrice: 0,
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addImportReceipt({
        dateReceipt: formData.dateReceipt,
        totalPrice: parseInt(formData.totalPrice),
      });
      if (response.status === 'CREATED') {
        setMessage({ type: 'success', text: response.message });
        setFormData({ dateReceipt: new Date().toISOString().split('T')[0], totalPrice: 0 });
        if (onSuccess) onSuccess();
      } else {
        setMessage({ type: 'error', text: 'Tạo phiếu không thành công' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Lỗi khi tạo phiếu' });
    }
  };

  return (
    <div className="p-6 bg-[#2a3b4c] rounded-lg">
      <h3 className="text-xl font-semibold text-white mb-4">Tạo Phiếu Nhập Mới</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300">Ngày lập phiếu</label>
          <input
            type="date"
            name="dateReceipt"
            value={formData.dateReceipt}
            onChange={handleChange}
            className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300">Tổng giá</label>
          <input
            type="number"
            name="totalPrice"
            value={formData.totalPrice}
            onChange={handleChange}
            className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
            required
          />
        </div>
        {message && (
          <div className={`p-2 rounded ${message.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
            {message.text}
          </div>
        )}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
          >
            Tạo Phiếu
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImportReceiptForm;