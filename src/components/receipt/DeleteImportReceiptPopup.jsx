import React from 'react';
import { FiX, FiTrash } from 'react-icons/fi';

const DeleteImportReceiptPopup = ({ receiptId, onClose, onDeleted }) => {
  const handleConfirmDelete = () => {
    onDeleted(receiptId);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-white text-gray-800 p-8 rounded-2xl w-[400px] shadow-2xl transform transition-all duration-300 scale-100 hover:scale-[1.02] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiTrash className="text-red-600" />
            Xác Nhận Xóa
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <FiX className="text-gray-500 hover:text-gray-700 text-xl" />
          </button>
        </div>
        <p className="text-gray-600 mb-6">Bạn có chắc chắn muốn xóa phiếu nhập số {receiptId}?</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium border border-gray-300"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirmDelete}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteImportReceiptPopup;