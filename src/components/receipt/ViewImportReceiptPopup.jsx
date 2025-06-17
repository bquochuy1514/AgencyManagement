import React from 'react';
import { FiX } from 'react-icons/fi';

const ViewImportReceiptPopup = ({ receipt, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-white text-gray-800 p-8 rounded-2xl w-[500px] shadow-2xl transform transition-all duration-300 scale-100 hover:scale-[1.02] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiEye className="text-blue-600" />
            Xem Chi Tiết Phiếu Nhập
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <FiX className="text-gray-500 hover:text-gray-700 text-xl" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600">Số phiếu</label>
            <input
              value={receipt.importReceiptID}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-gray-600">Ngày lập</label>
            <input
              value={new Date(receipt.dateReceipt).toLocaleDateString()}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-gray-600">Tổng tiền</label>
            <input
              value={`${new Intl.NumberFormat('vi-VN').format(receipt.totalMoney)} đ`}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-gray-600">Chi tiết</label>
            {receipt.details && receipt.details.length > 0 ? (
              <ul className="list-disc pl-5">
                {receipt.details.map((detail, index) => (
                  <li key={index} className="text-gray-800">
                    {detail.productName} - Số lượng: {detail.quantityImport}, Giá: {new Intl.NumberFormat('vi-VN').format(detail.importPrice)} đ, Thành tiền: {new Intl.NumberFormat('vi-VN').format(detail.intoMoney)} đ
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Chưa có chi tiết</p>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium border border-gray-300"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewImportReceiptPopup;