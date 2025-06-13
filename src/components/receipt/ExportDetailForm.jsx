// import React, { useState, useEffect } from 'react';
// import { addExportDetail } from '../../services/receiptService';

// const ExportDetailForm = ({ receiptId, onClose }) => {
//   const [formData, setFormData] = useState({
//     exportReceiptID: receiptId,
//     productID: '',
//     quantityExport: 0,
//     exportPrice: 0,
//     intoMoney: 0,
//   });
//   const [message, setMessage] = useState(null);
//   const [productIndex, setProductIndex] = useState(1);

//   useEffect(() => {
//     setFormData((prev) => ({
//       ...prev,
//       exportReceiptID: receiptId,
//       productID: productIndex.toString(),
//     }));
//   }, [receiptId, productIndex]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const updatedFormData = { ...formData, [name]: value };
//     if (name === 'quantityExport' || name === 'exportPrice') {
//       updatedFormData.intoMoney = Math.max(0, parseInt(updatedFormData.quantityExport || 0) * parseInt(updatedFormData.exportPrice || 0));
//     }
//     setFormData(updatedFormData);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await addExportDetail({
//         exportReceiptID: { exportReceiptID: parseInt(formData.exportReceiptID) },
//         productID: { productID: parseInt(formData.productID) },
//         quantityExport: parseInt(formData.quantityExport),
//         exportPrice: parseInt(formData.exportPrice),
//         intoMoney: parseInt(formData.intoMoney),
//       });
//       setMessage({ type: 'success', text: response.message });
//       setFormData({ ...formData, productID: (productIndex + 1).toString(), quantityExport: 0, exportPrice: 0, intoMoney: 0 });
//       setProductIndex((prev) => prev + 1);
//     } catch (error) {
//       setMessage({ type: 'error', text: error.message });
//     }
//   };

//   return (
//     <div className="p-6 bg-[#2a3b4c] rounded-lg shadow-lg">
//       <h3 className="text-xl font-semibold text-white mb-4">Thêm Chi Tiết Phiếu Xuất</h3>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-300">Mã phiếu xuất</label>
//           <input
//             type="number"
//             name="exportReceiptID"
//             value={formData.exportReceiptID}
//             readOnly
//             className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md bg-gray-700"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-300">Mã sản phẩm</label>
//           <input
//             type="number"
//             name="productID"
//             value={formData.productID}
//             readOnly
//             className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md bg-gray-700"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-300">Số lượng xuất</label>
//           <input
//             type="number"
//             name="quantityExport"
//             value={formData.quantityExport}
//             onChange={handleChange}
//             className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-300">Giá xuất</label>
//           <input
//             type="number"
//             name="exportPrice"
//             value={formData.exportPrice}
//             onChange={handleChange}
//             className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-300">Thành tiền</label>
//           <input
//             type="number"
//             name="intoMoney"
//             value={formData.intoMoney}
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
//             Thêm chi tiết
//           </button>
//           <button type="button" onClick={onClose} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition">
//             Hủy
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ExportDetailForm;
import React, { useState, useEffect } from 'react';

const ExportDetailForm = ({ receiptId, receipt, onClose, onAddDetail }) => {
  const [formData, setFormData] = useState({
    exportReceiptID: receiptId,
    productID: '',
    productName: '',
    unitName: '',
    quantityExport: 0,
    exportPrice: 0,
    intoMoney: 0,
  });
  const [message, setMessage] = useState(null);
  const [productIndex, setProductIndex] = useState((receipt?.details?.length || 0) + 1);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      exportReceiptID: receiptId,
      productID: productIndex.toString(),
    }));
  }, [receiptId, productIndex]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    if (name === 'quantityExport' || name === 'exportPrice') {
      updatedFormData.intoMoney = Math.max(0, parseInt(updatedFormData.quantityExport || 0) * parseInt(updatedFormData.exportPrice || 0));
    }
    setFormData(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.productName || !formData.unitName || !formData.quantityExport || !formData.exportPrice) {
      setMessage({ type: 'error', text: 'Vui lòng điền đầy đủ thông tin!' });
      return;
    }
    const newDetail = {
      stt: productIndex,
      productName: formData.productName,
      unitName: formData.unitName,
      quantityExport: parseInt(formData.quantityExport),
      exportPrice: parseInt(formData.exportPrice),
      intoMoney: parseInt(formData.intoMoney),
    };
    onAddDetail(newDetail);
    setMessage({ type: 'success', text: 'Thêm chi tiết xuất thành công!' });
    setFormData({
      exportReceiptID: receiptId,
      productID: (productIndex + 1).toString(),
      productName: '',
      unitName: '',
      quantityExport: 0,
      exportPrice: 0,
      intoMoney: 0,
    });
    setProductIndex(prev => prev + 1);
  };

  return (
    <div className="p-6 bg-[#2a3b4c] rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-white mb-4">Thêm Chi Tiết Phiếu Xuất</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300">Mã phiếu xuất</label>
          <input
            type="number"
            name="exportReceiptID"
            value={formData.exportReceiptID}
            readOnly
            className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md bg-gray-700"
          />
        </div>
        {receipt && (
          <>
            <div>
              <label className="block text-gray-300">Ngày lập phiếu</label>
              <input
                type="text"
                value={new Date(receipt.dateReceipt).toLocaleDateString()}
                readOnly
                className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-gray-300">Tổng tiền</label>
              <input
                type="text"
                value={new Intl.NumberFormat('vi-VN').format(receipt.totalMoney) + ' đ'}
                readOnly
                className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md bg-gray-700"
              />
            </div>
          </>
        )}
        <div>
          <label className="block text-gray-300">Mã sản phẩm</label>
          <input
            type="text"
            name="productID"
            value={formData.productID}
            readOnly
            className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md bg-gray-700"
          />
        </div>
        <div>
          <label className="block text-gray-300">Tên sản phẩm</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300">Đơn vị tính</label>
          <input
            type="text"
            name="unitName"
            value={formData.unitName}
            onChange={handleChange}
            className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300">Số lượng xuất</label>
          <input
            type="number"
            name="quantityExport"
            value={formData.quantityExport}
            onChange={handleChange}
            className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300">Giá xuất</label>
          <input
            type="number"
            name="exportPrice"
            value={formData.exportPrice}
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
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Thêm chi tiết
          </button>
          <button type="button" onClick={onClose} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition">
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExportDetailForm;