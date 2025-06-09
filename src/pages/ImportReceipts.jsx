import React, { useState, useEffect } from 'react';
import { getAllImportReceipts } from '../services/receiptService';
import ImportReceiptForm from '../components/receipt/ImportReceiptForm';
import ReceiptList from '../components/receipt/ReceiptList';

const ImportReceipts = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Mặc định ngày hiện tại

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await getAllImportReceipts(selectedDate);
        const sortedReceipts = response.data.sort((a, b) => a.importReceiptID - b.importReceiptID);
        setReceipts(sortedReceipts || []);
      } catch (error) {
        console.error('Error fetching receipts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReceipts();
  }, [selectedDate]);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const response = await getAllImportReceipts(selectedDate);
      setReceipts(response.data.sort((a, b) => a.importReceiptID - b.importReceiptID));
    } catch (error) {
      console.error('Error refreshing receipts:', error);
    } finally {
      setLoading(false);
      setShowForm(false); // Ẩn form sau khi làm mới
    }
  };

  if (loading) {
    return <div className="p-6 text-white">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="p-6 bg-[#1a2634] rounded-lg min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">QUẢN LÝ PHIẾU NHẬP</h2>
          <p className="text-sm text-gray-400">Quản lý danh sách phiếu nhập và thông tin chi tiết</p>
        </div>
        <div className="flex space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-600 p-2 bg-gray-800 text-white rounded-md"
          />
          <button
            onClick={() => setShowForm(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
          >
            + Thêm Phiếu Nhập Mới
          </button>
        </div>
      </div>

      {/* Form Section */}
      {showForm && (
        <ImportReceiptForm
          onCancel={() => setShowForm(false)}
          onSuccess={handleRefresh}
        />
      )}

      {/* Receipt List Section */}
      <ReceiptList receipts={receipts} type="import" />
    </div>
  );
};

export default ImportReceipts;