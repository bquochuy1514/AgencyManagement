import React, { useState, useEffect } from 'react';
import { getAllImportReceipts } from '../services/receiptService';
import ImportReceiptForm from '../components/receipt/ImportReceiptForm';
import ImportDetailForm from '../components/receipt/ImportDetailForm';

const ImportReceipts = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await getAllImportReceipts();
        setReceipts(response.data || []);
      } catch (error) {
        console.error('Error fetching receipts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReceipts();
  }, []);

  if (loading) {
    return <div className="p-6 text-white">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Danh sách Phiếu Nhập</h1>
      <div className="space-y-6">
        <ImportReceiptForm />
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Mã phiếu</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ngày lập</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Tổng giá</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 text-gray-200">
              {receipts.map((receipt) => (
                <tr key={receipt.importReceiptID} className="border-t border-gray-700">
                  <td className="px-4 py-3">{receipt.importReceiptID}</td>
                  <td className="px-4 py-3">{new Date(receipt.dateReceipt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    {new Intl.NumberFormat('vi-VN').format(receipt.totalPrice)} đ
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ImportDetailForm />
      </div>
    </div>
  );
};

export default ImportReceipts;