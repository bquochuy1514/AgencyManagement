import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getExportDetailByReceiptId } from '../../services/receiptService';

const ReceiptDetails = () => {
  const { receiptId } = useParams();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getExportDetailByReceiptId(receiptId || 1);
        setDetails(response.data || []);
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [receiptId]);

  if (loading) {
    return <div className="p-6 text-red">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="p-6 bg-gray-900 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Chi Tiết Sản Phẩm Trong Phiếu</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Số lượng</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Giá xuất</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Thành tiền</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700 text-gray-200">
            {details.map((detail, index) => (
              <tr key={index} className="border-t border-gray-700">
                <td className="px-4 py-3">{detail.quantityExport}</td>
                <td className="px-4 py-3">
                  {new Intl.NumberFormat('vi-VN').format(detail.exportPrice)} đ
                </td>
                <td className="px-4 py-3">
                  {new Intl.NumberFormat('vi-VN').format(detail.intoMoney)} đ
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReceiptDetails;