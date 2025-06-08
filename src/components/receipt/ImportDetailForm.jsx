import React, { useState } from 'react';
import { addImportDetail } from '../../services/receiptService';

const ImportDetailForm = () => {
  const [formData, setFormData] = useState({
    importReceiptID: '',
    productID: '',
    quantityImport: 0,
    importPrice: 0,
    intoMoney: 0,
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
        unit: 1, // Giả định unit là 1, cần điều chỉnh nếu có API hỗ trợ
      });
      setMessage({ type: 'success', text: response.message });
      setFormData({ importReceiptID: '', productID: '', quantityImport: 0, importPrice: 0, intoMoney: 0 });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Tạo Chi Tiết Nhập Hàng</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300">Mã phiếu nhập</label>
          <input
            type="number"
            name="importReceiptID"
            value={formData.importReceiptID}
            onChange={handleChange}
            className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
            required
          />
        </div>
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
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
        >
          Tạo Chi Tiết
        </button>
      </form>
    </div>
  );
};

export default ImportDetailForm;