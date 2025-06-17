// import React, { useState, useEffect } from 'react';
// import { addImportDetail } from '../../services/receiptService';

// const ImportDetailForm = ({ receiptId, receiptDetails, onClose }) => {
//   const [formData, setFormData] = useState({
//     importReceiptID: receiptId,
//     productID: '',
//     quantityImport: 0,
//     importPrice: 0,
//     intoMoney: 0,
//   });
//   const [message, setMessage] = useState(null);
//   const [productIndex, setProductIndex] = useState(1);

//   useEffect(() => {
//     setFormData((prev) => ({
//       ...prev,
//       importReceiptID: receiptId,
//       productID: productIndex.toString(),
//     }));
//   }, [receiptId, productIndex]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const updatedFormData = { ...formData, [name]: value };
//     if (name === 'quantityImport' || name === 'importPrice') {
//       updatedFormData.intoMoney = Math.max(0, parseInt(updatedFormData.quantityImport || 0) * parseInt(updatedFormData.importPrice || 0));
//     }
//     setFormData(updatedFormData);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await addImportDetail({
//         importReceiptID: { importReceiptID: parseInt(formData.importReceiptID) },
//         productID: { productID: parseInt(formData.productID) },
//         quantityImport: parseInt(formData.quantityImport),
//         importPrice: parseInt(formData.importPrice),
//         intoMoney: parseInt(formData.intoMoney),
//       });
//       setMessage({ type: 'success', text: response.message });
//       setFormData({ ...formData, productID: (productIndex + 1).toString(), quantityImport: 0, importPrice: 0, intoMoney: 0 });
//       setProductIndex((prev) => prev + 1);
//     } catch (error) {
//       setMessage({ type: 'error', text: error.message });
//     }
//   };

//   return (
//     <div className="p-6 bg-[#2a3b4c] rounded-lg shadow-lg">
//       <h3 className="text-xl font-semibold text-white mb-4">Thêm Chi Tiết Phiếu Nhập</h3>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-300">Mã phiếu nhập</label>
//           <input
//             type="number"
//             name="importReceiptID"
//             value={formData.importReceiptID}
//             readOnly
//             className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md bg-gray-700"
//           />
//         </div>
//         {receiptDetails && (
//           <>
//             <div>
//               <label className="block text-gray-300">Ngày lập phiếu</label>
//               <input
//                 type="text"
//                 value={receiptDetails.dateReceipt}
//                 readOnly
//                 className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md bg-gray-700"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-300">Tổng giá</label>
//               <input
//                 type="text"
//                 value={new Intl.NumberFormat('vi-VN').format(receiptDetails.totalPrice) + ' đ'}
//                 readOnly
//                 className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md bg-gray-700"
//               />
//             </div>
//           </>
//         )}
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
//           <label className="block text-gray-300">Số lượng nhập</label>
//           <input
//             type="number"
//             name="quantityImport"
//             value={formData.quantityImport}
//             onChange={handleChange}
//             className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-300">Giá nhập</label>
//           <input
//             type="number"
//             name="importPrice"
//             value={formData.importPrice}
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

// export default ImportDetailForm;
import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../../App';

const ImportDetailForm = ({ receiptId, receipt, onClose, onAddDetail }) => {
  const { products, units } = useContext(ProductContext);
  const [formData, setFormData] = useState({
    importReceiptID: receiptId,
    productID: '',
    unitID: '',
    quantityImport: 0,
    importPrice: 0,
    intoMoney: 0,
  });
  const [message, setMessage] = useState(null);
  const [productIndex, setProductIndex] = useState((receipt?.details?.length || 0) + 1);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      importReceiptID: receiptId,
      productID: '',
      unitID: '',
    }));
  }, [receiptId, productIndex]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    if (name === 'quantityImport' || name === 'importPrice') {
      updatedFormData.intoMoney = Math.max(0, parseInt(updatedFormData.quantityImport || 0) * parseInt(updatedFormData.importPrice || 0));
    }
    setFormData(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.productID || !formData.unitID || !formData.quantityImport || !formData.importPrice) {
      setMessage({ type: 'error', text: 'Vui lòng điền đầy đủ thông tin!' });
      return;
    }
    const product = products.find(p => p.productID === parseInt(formData.productID));
    const unit = units.find(u => u.unitID === parseInt(formData.unitID));
    const newDetail = {
      stt: productIndex,
      productID: parseInt(formData.productID),
      productName: product?.productName || '',
      unitID: parseInt(formData.unitID),
      unitName: unit?.unitName || '',
      quantityImport: parseInt(formData.quantityImport),
      importPrice: parseInt(formData.importPrice),
      intoMoney: parseInt(formData.intoMoney),
    };
    onAddDetail(newDetail);
    setMessage({ type: 'success', text: 'Thêm chi tiết nhập thành công!' });
    setFormData({
      importReceiptID: receiptId,
      productID: '',
      unitID: '',
      quantityImport: 0,
      importPrice: 0,
      intoMoney: 0,
    });
    setProductIndex(prev => prev + 1);
  };

  return (
    <div className="p-6 bg-[#2a3b4c] rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-white mb-4">Thêm Chi Tiết Phiếu Nhập</h3>
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
              <label className="block text-gray-300">Tổng giá</label>
              <input
                type="text"
                value={new Intl.NumberFormat('vi-VN').format(receipt.totalPrice) + ' đ'}
                readOnly
                className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md bg-gray-700"
              />
            </div>
          </>
        )}
        <div>
          <label className="block text-gray-300">Sản phẩm</label>
          <select
            name="productID"
            value={formData.productID}
            onChange={handleChange}
            className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
          >
            <option value="">Chọn sản phẩm</option>
            {products.map(product => (
              <option key={product.productID} value={product.productID}>{product.productName}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-300">Đơn vị tính</label>
          <select
            name="unitID"
            value={formData.unitID}
            onChange={handleChange}
            className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
          >
            <option value="">Chọn đơn vị</option>
            {units.map(unit => (
              <option key={unit.unitID} value={unit.unitID}>{unit.unitName}</option>
            ))}
          </select>
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

export default ImportDetailForm;



