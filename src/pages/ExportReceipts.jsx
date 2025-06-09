import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { getAllExportReceipts, addExportReceipt } from '../services/receiptService';
import ReceiptList from '../components/receipt/ReceiptList';

const ExportReceipts = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    dateReceipt: '',
    agentID: '',
    totalMoney: 0,
    paymentAmount: 0,
    remainAmount: 0,
  });
  const [message, setMessage] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await getAllExportReceipts();
        const sortedReceipts = response.data.sort((a, b) => a.exportReceiptID - b.exportReceiptID);
        setReceipts(sortedReceipts || []);
      } catch (error) {
        console.error('Error fetching receipts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReceipts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    if (name === 'totalMoney' || name === 'paymentAmount') {
      updatedFormData.remainAmount = Math.max(0, parseInt(updatedFormData.totalMoney || 0) - parseInt(updatedFormData.paymentAmount || 0));
    }
    setFormData(updatedFormData);
  };

  const handleCreateReceipt = async (e) => {
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
      setFormData({
        dateReceipt: '',
        agentID: '',
        totalMoney: 0,
        paymentAmount: 0,
        remainAmount: 0,
      });
      setShowForm(false);
      const updatedReceipts = await getAllExportReceipts();
      setReceipts(updatedReceipts.data.sort((a, b) => a.exportReceiptID - b.exportReceiptID));
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      dateReceipt: '',
      agentID: '',
      totalMoney: 0,
      paymentAmount: 0,
      remainAmount: 0,
    });
    setMessage(null);
  };

  if (loading) {
    return <div className="p-6 text-white">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="p-6 bg-[#1a2634] rounded-lg min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">QUẢN LÝ PHIẾU XUẤT</h2>
          <p className="text-sm text-gray-400">Quản lý danh sách phiếu xuất và thông tin chi tiết</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
        >
          + Thêm Phiếu Xuất Mới
        </button>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="p-6 bg-[#2a3b4c] rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">Tạo Phiếu Xuất Mới</h3>
          <form onSubmit={handleCreateReceipt} className="space-y-4">
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
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
              >
                Tạo Phiếu
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Receipt List Section */}
      <ReceiptList receipts={receipts} type="export" />
    </div>
  );
};

export default ExportReceipts;