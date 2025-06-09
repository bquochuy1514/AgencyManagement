import React, { useState } from 'react';
import { addImportDetail } from '../../services/receiptService';

const ImportDetailForm = ({ receiptId, receiptDetails, onClose }) => {
  const [formData, setFormData] = useState({
    importReceiptID: receiptId,
    productID: '',
    quantityImport: 0,
    importPrice: 0,
    intoMoney: 0,
    unit: 1,
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    if (name === 'quantityImport' || name === 'importPrice') {
      updatedFormData.intoMoney = Math.max(0, parseInt(updatedFormData.quantityImport || 0) * parseInt(updatedFormData.importPrice || 0));
    }
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addImportDetail({
        importReceiptID: { importReceiptID: parseInt(formData.importReceiptID) },
        productID: { productID: parseInt(formData.productID) },
        quantityImport: parseInt(formData.quantityImport),
        importPrice: parseInt(formData.importPrice),
        intoMoney: parseInt(formData.intoMoney),
        unit: parseInt(formData.unit),
      });
      setMessage({ type: 'success', text: response.message });
      setFormData({ ...formData, productID: '', quantityImport: 0, importPrice: 0, intoMoney: 0 });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-300">Mã phiếu nhập</label>
        <input
          type="number"
          name="importReceiptID"
          value={formData.importReceiptID}
          readOnly
          className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md bg-gray-700"
        />
      </div>
      {receiptDetails && (
        <>
          <div>
            <label className="block text-gray-300">Ngày lập phiếu</label>
            <input
              type="text"
              value={receiptDetails.dateReceipt}
              readOnly
              className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md bg-gray-700"
            />
          </div>
          <div>
            <label className="block text-gray-300">Tổng giá</label>
            <input
              type="text"
              value={new Intl.NumberFormat('vi-VN').format(receiptDetails.totalPrice) + ' đ'}
              readOnly
              className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md bg-gray-700"
            />
          </div>
        </>
      )}
      <div>
        <label className="block text-gray-300">Mã sản phẩm</label>
        <input
          type="number"
          name="productID"
          value={formData.productID}
          onChange={handleChange}
          className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-gray-300">Số lượng nhập</label>
        <input
          type="number"
          name="quantityImport"
          value={formData.quantityImport}
          onChange={handleChange}
          className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-gray-300">Giá nhập</label>
        <input
          type="number"
          name="importPrice"
          value={formData.importPrice}
          onChange={handleChange}
          className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-gray-300">Thành tiền</label>
        <input
          type="number"
          name="intoMoney"
          value={formData.intoMoney}
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
          Tạo Chi Tiết
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Hủy
        </button>
      </div>
    </form>
  );
};

export default ImportDetailForm;