import React, { useState } from 'react';
import { addImportReceipt } from '../../services/receiptService';

const ImportReceiptForm = () => {
  const [formData, setFormData] = useState({
    dateReceipt: '',
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
      setMessage({ type: 'success', text: response.message });
      setFormData({ dateReceipt: '', totalPrice: 0 });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Tạo Phiếu Nhập Hàng</h2>
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
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
        >
          Tạo Phiếu
        </button>
      </form>
    </div>
  );
};

export default ImportReceiptForm;