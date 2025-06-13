// import React, { useState } from 'react';
// import { addExportReceipt } from '../../services/receiptService';

// const ExportReceiptForm = ({ onCancel, onSuccess }) => {
//   const [formData, setFormData] = useState({
//     dateReceipt: '',
//     agentID: '',
//     totalMoney: 0,
//     paymentAmount: 0,
//     remainAmount: 0,
//   });
//   const [message, setMessage] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const updatedFormData = { ...formData, [name]: value };
//     if (name === 'totalMoney' || name === 'paymentAmount') {
//       updatedFormData.remainAmount = Math.max(0, parseInt(updatedFormData.totalMoney || 0) - parseInt(updatedFormData.paymentAmount || 0));
//     }
//     setFormData(updatedFormData);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await addExportReceipt({
//         dateReceipt: formData.dateReceipt,
//         agentID: { agentID: parseInt(formData.agentID) },
//         totalMoney: parseInt(formData.totalMoney),
//         paymentAmount: parseInt(formData.paymentAmount),
//         remainAmount: parseInt(formData.remainAmount),
//       });
//       setMessage({ type: 'success', text: response.message });
//       onSuccess();
//     } catch (error) {
//       setMessage({ type: 'error', text: error.message });
//     }
//   };

//   return (
//     <div className="p-6 bg-[#2a3b4c] rounded-lg shadow-lg">
//       <h3 className="text-xl font-semibold text-white mb-4">Thêm Phiếu Xuất Mới</h3>
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
//           <label className="block text-gray-300">Mã đại lý</label>
//           <input
//             type="number"
//             name="agentID"
//             value={formData.agentID}
//             onChange={handleChange}
//             className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-300">Tổng tiền</label>
//           <input
//             type="number"
//             name="totalMoney"
//             value={formData.totalMoney}
//             onChange={handleChange}
//             className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-300">Số tiền thanh toán</label>
//           <input
//             type="number"
//             name="paymentAmount"
//             value={formData.paymentAmount}
//             onChange={handleChange}
//             className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-300">Số tiền còn lại</label>
//           <input
//             type="number"
//             name="remainAmount"
//             value={formData.remainAmount}
//             readOnly
//             className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md bg-gray-700"
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

// export default ExportReceiptForm;
import React, { useState } from 'react';

const ExportReceiptForm = ({ onCancel, onSuccess }) => {
  const [receiptData, setReceiptData] = useState({
    dateReceipt: new Date().toISOString().split('T')[0],
    totalMoney: '',
    paymentAmount: '',
    remainAmount: '',
    agentID: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!receiptData.dateReceipt) newErrors.dateReceipt = 'Ngày lập phiếu không được để trống';
    if (!receiptData.totalMoney || receiptData.totalMoney < 0)
      newErrors.totalMoney = 'Tổng tiền phải là số không âm';
    if (!receiptData.paymentAmount || receiptData.paymentAmount < 0)
      newErrors.paymentAmount = 'Số tiền trả phải là số không âm';
    if (!receiptData.remainAmount || receiptData.remainAmount < 0)
      newErrors.remainAmount = 'Số tiền còn lại phải là số không âm';
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
      paymentAmount: parseInt(receiptData.paymentAmount),
      remainAmount: parseInt(receiptData.remainAmount),
      agentID: receiptData.agentID,
    });
    setReceiptData({
      dateReceipt: new Date().toISOString().split('T')[0],
      totalMoney: '',
      paymentAmount: '',
      remainAmount: '',
      agentID: '',
    });
    setErrors({});
  };

  return (
    <div className="bg-[#2a3b4c] rounded-lg shadow-md p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">Thêm Phiếu Xuất Mới</h2>
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
        <div>
          <label className="block text-sm font-medium">Số tiền trả</label>
          <input
            type="number"
            name="paymentAmount"
            value={receiptData.paymentAmount}
            onChange={handleChange}
            className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
            placeholder="Nhập số tiền trả"
          />
          {errors.paymentAmount && <p className="text-red-400 text-sm mt-1">{errors.paymentAmount}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Còn lại</label>
          <input
            type="number"
            name="remainAmount"
            value={receiptData.remainAmount}
            onChange={handleChange}
            className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
            placeholder="Nhập số tiền còn lại"
          />
          {errors.remainAmount && <p className="text-red-400 text-sm mt-1">{errors.remainAmount}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Đại lý</label>
          <input
            type="text"
            name="agentID"
            value={receiptData.agentID}
            onChange={handleChange}
            className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
            placeholder="Nhập mã đại lý"
          />
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

export default ExportReceiptForm;