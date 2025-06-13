// import React, { useState } from 'react';
// import { addImportReceipt } from '../../services/receiptService';

// const ImportReceiptForm = ({ onCancel, onSuccess }) => {
//   const [formData, setFormData] = useState({
//     dateReceipt: '',
//     totalPrice: 0,
//   });
//   const [message, setMessage] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await addImportReceipt(formData);
//       setMessage({ type: 'success', text: response.message });
//       onSuccess();
//     } catch (error) {
//       setMessage({ type: 'error', text: error.message });
//     }
//   };

//   return (
//     <div className="p-6 bg-[#2a3b4c] rounded-lg shadow-lg">
//       <h3 className="text-xl font-semibold text-white mb-4">Thêm Phiếu Nhập Mới</h3>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-300">Ngày lập</label>
//           <input
//             type="date"
//             name="dateReceipt"
//             value={formData.dateReceipt}
//             onChange={handleChange}
//             className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-300">Tổng giá</label>
//           <input
//             type="number"
//             name="totalPrice"
//             value={formData.totalPrice}
//             onChange={handleChange}
//             className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
//             required
//           />
//         </div>
//         {message && (
//           <div className={`p-2 rounded ${message.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
//             {message.text}
//           </div>
//         )}
//         <div className="flex space-x-4">
//           <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
//             Thêm phiếu
//           </button>
//           <button type="button" onClick={onCancel} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition">
//             Hủy
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ImportReceiptForm;
import React, { useState } from 'react';

const ImportReceiptForm = ({ onCancel, onSuccess }) => {
  const [receiptData, setReceiptData] = useState({
    dateReceipt: new Date().toISOString().split('T')[0],
    totalMoney: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!receiptData.dateReceipt) newErrors.dateReceipt = 'Ngày lập phiếu không được để trống';
    if (!receiptData.totalMoney || receiptData.totalMoney < 0)
      newErrors.totalMoney = 'Tổng tiền phải là số không âm';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReceiptData({ ...receiptData, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    onSuccess({
      dateReceipt: receiptData.dateReceipt,
      totalMoney: parseInt(receiptData.totalMoney),
    });
    setReceiptData({ dateReceipt: new Date().toISOString().split('T')[0], totalMoney: '' });
    setErrors({});
  };

  return (
    <div className="bg-[#2a3b4c] rounded-lg shadow-md p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">Thêm Phiếu Nhập Mới</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Ngày lập phiếu</label>
          <input
            type="date"
            name="dateReceipt"
            value={receiptData.dateReceipt}
            onChange={handleChange}
            className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
          />
          {errors.dateReceipt && <p className="text-red-400 text-sm mt-1">{errors.dateReceipt}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Tổng tiền</label>
          <input
            type="number"
            name="totalMoney"
            value={receiptData.totalMoney}
            onChange={handleChange}
            className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
            placeholder="Nhập tổng tiền"
          />
          {errors.totalMoney && <p className="text-red-400 text-sm mt-1">{errors.totalMoney}</p>}
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Thêm phiếu
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full bg-gray-600 px-4 py-2 rounded-md hover:bg-gray-700 transition text-white"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImportReceiptForm;