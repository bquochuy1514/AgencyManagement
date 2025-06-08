import React, { useState } from 'react';
import { addExportReceipt } from '../../services/receiptService';

const ExportReceiptForm = () => {
  const [formData, setFormData] = useState({
    dateReceipt: '',
    agentID: '',
    totalMoney: 0,
    paymentAmount: 0,
    remainAmount: 0,
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    if (name === 'totalMoney' || name === 'paymentAmount') {
      updatedFormData.remainAmount = Math.max(0, parseInt(updatedFormData.totalMoney || 0) - parseInt(updatedFormData.paymentAmount || 0));
    }
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addExportReceipt({
        dateReceipt: formData.dateReceipt,
        agentID: { agentID: parseInt(formData.agentID) },
        totalMoney: parseInt(formData.totalMoney),
        paymentAmount: parseInt(formData.paymentAmount),
        remainAmount: parseInt(formData.remainAmount),
      });
      setMessage({ type: 'success', text: response.message });
      setFormData({ dateReceipt: '', agentID: '', totalMoney: 0, paymentAmount: 0, remainAmount: 0 });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Tạo Phiếu Xuất Hàng</h2>
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
          <label className="block text-gray-300">Mã đại lý</label>
          <input
            type="number"
            name="agentID"
            value={formData.agentID}
            onChange={handleChange}
            className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300">Tổng tiền</label>
          <input
            type="number"
            name="totalMoney"
            value={formData.totalMoney}
            onChange={handleChange}
            className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300">Số tiền thanh toán</label>
          <input
            type="number"
            name="paymentAmount"
            value={formData.paymentAmount}
            onChange={handleChange}
            className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300">Số tiền còn lại</label>
          <input
            type="number"
            name="remainAmount"
            value={formData.remainAmount}
            readOnly
            className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md bg-gray-700"
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

export default ExportReceiptForm;