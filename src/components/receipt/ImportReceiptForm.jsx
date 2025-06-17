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
import React, { useState, useContext } from 'react';
import { ProductContext } from '../../App';

const ImportReceiptForm = ({ onCancel, onSuccess }) => {
  const { products, units } = useContext(ProductContext);
  const [receiptData, setReceiptData] = useState({
    dateReceipt: new Date().toISOString().split('T')[0],
    details: [{ productID: '', unitID: '', quantityImport: 0, importPrice: 0, intoMoney: 0 }],
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!receiptData.dateReceipt) newErrors.dateReceipt = 'Ngày lập phiếu không được để trống';
    receiptData.details.forEach((detail, index) => {
      if (!detail.productID) newErrors[`productID_${index}`] = 'Vui lòng chọn sản phẩm';
      if (!detail.unitID) newErrors[`unitID_${index}`] = 'Vui lòng chọn đơn vị';
      if (!detail.quantityImport || detail.quantityImport <= 0)
        newErrors[`quantityImport_${index}`] = 'Số lượng phải lớn hơn 0';
      if (!detail.importPrice || detail.importPrice <= 0)
        newErrors[`importPrice_${index}`] = 'Giá nhập phải lớn hơn 0';
    });
    return newErrors;
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDetails = [...receiptData.details];
    updatedDetails[index] = { ...updatedDetails[index], [name]: value };
    if (name === 'quantityImport' || name === 'importPrice') {
      updatedDetails[index].intoMoney = Math.max(0, parseInt(updatedDetails[index].quantityImport || 0) * parseInt(updatedDetails[index].importPrice || 0));
    }
    setReceiptData({ ...receiptData, details: updatedDetails });
    setErrors({ ...errors, [`${name}_${index}`]: null });
  };

  const addDetail = () => {
    setReceiptData({
      ...receiptData,
      details: [...receiptData.details, { productID: '', unitID: '', quantityImport: 0, importPrice: 0, intoMoney: 0 }],
    });
  };

  const removeDetail = (index) => {
    const updatedDetails = receiptData.details.filter((_, i) => i !== index);
    setReceiptData({ ...receiptData, details: updatedDetails });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const totalPrice = receiptData.details.reduce((sum, detail) => sum + detail.intoMoney, 0);
    onSuccess({
      dateReceipt: receiptData.dateReceipt,
      totalPrice: totalPrice,
      details: receiptData.details.map((detail, index) => ({
        stt: index + 1,
        productID: parseInt(detail.productID),
        productName: products.find(p => p.productID === parseInt(detail.productID))?.productName || '',
        unitID: parseInt(detail.unitID),
        unitName: units.find(u => u.unitID === parseInt(detail.unitID))?.unitName || '',
        quantityImport: parseInt(detail.quantityImport),
        importPrice: parseInt(detail.importPrice),
        intoMoney: parseInt(detail.intoMoney),
      })),
    });
    setReceiptData({ dateReceipt: new Date().toISOString().split('T')[0], details: [{ productID: '', unitID: '', quantityImport: 0, importPrice: 0, intoMoney: 0 }] });
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
            onChange={(e) => setReceiptData({ ...receiptData, dateReceipt: e.target.value })}
            className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
          />
          {errors.dateReceipt && <p className="text-red-400 text-sm mt-1">{errors.dateReceipt}</p>}
        </div>
        <div>
          <h3 className="text-lg font-medium">Danh sách mặt hàng</h3>
          {receiptData.details.map((detail, index) => (
            <div key={index} className="border-t border-gray-600 pt-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium">Sản phẩm</label>
                  <select
                    name="productID"
                    value={detail.productID}
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 text-white"
                  >
                    <option value="">Chọn sản phẩm</option>
                    {products.map(product => (
                      <option key={product.productID} value={product.productID}>{product.productName}</option>
                    ))}
                  </select>
                  {errors[`productID_${index}`] && <p className="text-red-400 text-sm mt-1">{errors[`productID_${index}`]}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium">Đơn vị tính</label>
                  <select
                    name="unitID"
                    value={detail.unitID}
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 text-white"
                  >
                    <option value="">Chọn đơn vị</option>
                    {units.map(unit => (
                      <option key={unit.unitID} value={unit.unitID}>{unit.unitName}</option>
                    ))}
                  </select>
                  {errors[`unitID_${index}`] && <p className="text-red-400 text-sm mt-1">{errors[`unitID_${index}`]}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium">Số lượng</label>
                  <input
                    type="number"
                    name="quantityImport"
                    value={detail.quantityImport}
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 text-white"
                    placeholder="Số lượng"
                  />
                  {errors[`quantityImport_${index}`] && <p className="text-red-400 text-sm mt-1">{errors[`quantityImport_${index}`]}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium">Giá nhập</label>
                  <input
                    type="number"
                    name="importPrice"
                    value={detail.importPrice}
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 text-white"
                    placeholder="Giá nhập"
                  />
                  {errors[`importPrice_${index}`] && <p className="text-red-400 text-sm mt-1">{errors[`importPrice_${index}`]}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium">Thành tiền</label>
                  <input
                    type="number"
                    value={detail.intoMoney}
                    readOnly
                    className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 text-white bg-gray-700"
                  />
                </div>
              </div>
              {receiptData.details.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDetail(index)}
                  className="mt-2 text-red-400 hover:text-red-500"
                >
                  Xóa mặt hàng
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addDetail}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            + Thêm mặt hàng
          </button>
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



// phần này dùng để fetch api
// import React, { useState, useContext } from 'react';
// import { ProductContext } from '../../App';
// import ImportDetailForm from './ImportDetailForm';
// import { addImportReceipt, addImportDetail, getImportDetailByReceiptId } from '../../services/receiptService';

// const ImportReceiptForm = ({ onSuccess }) => {
//   const { products, units } = useContext(ProductContext);
//   const [receiptData, setReceiptData] = useState({
//     dateReceipt: new Date().toISOString().split('T')[0],
//     details: [{ productID: '', unitID: '', quantityImport: 0, importPrice: 0, intoMoney: 0 }],
//   });
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};
//     if (!receiptData.dateReceipt) {
//       newErrors.dateReceipt = 'Vui lòng chọn ngày nhập hàng';
//     }
//     receiptData.details.forEach((detail, index) => {
//       if (!detail.productID) {
//         newErrors[`productID_${index}`] = 'Vui lòng chọn sản phẩm';
//       }
//       if (!detail.unitID) {
//         newErrors[`unitID_${index}`] = 'Vui lòng chọn đơn vị tính';
//       }
//       if (detail.quantityImport <= 0) {
//         newErrors[`quantityImport_${index}`] = 'Số lượng nhập phải lớn hơn 0';
//       }
//       if (detail.importPrice <= 0) {
//         newErrors[`importPrice_${index}`] = 'Giá nhập phải lớn hơn 0';
//       }
//     });
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formErrors = validateForm();
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return;
//     }

//     try {
//       // Tạo phiếu nhập với mặt hàng đầu tiên
//       const firstDetail = receiptData.details[0];
//       const receiptDataToSend = {
//         dateReceipt: receiptData.dateReceipt,
//         productID: parseInt(firstDetail.productID),
//         unitID: parseInt(firstDetail.unitID),
//         quantityImport: parseInt(firstDetail.quantityImport),
//         importPrice: parseInt(firstDetail.importPrice),
//       };
//       const receiptResponse = await addImportReceipt(receiptDataToSend);
//       const newReceipt = receiptResponse.data;

//       // Thêm các mặt hàng còn lại (nếu có) qua importDetail
//       const detailsPromises = receiptData.details.slice(1).map(async (detail) => {
//         const detailData = {
//           importReceiptID: newReceipt.importReceiptID,
//           productID: parseInt(detail.productID),
//           unitID: parseInt(detail.unitID),
//           quantityImport: parseInt(detail.quantityImport),
//           importPrice: parseInt(detail.importPrice),
//         };
//         return await addImportDetail(detailData);
//       });
//       await Promise.all(detailsPromises);

//       // Lấy lại chi tiết phiếu nhập để hiển thị
//       const detailsResponse = await getImportDetailByReceiptId(newReceipt.importReceiptID);
//       const updatedReceipt = {
//         ...newReceipt,
//         totalPrice: detailsResponse.data.reduce((sum, d) => sum + d.intoMoney, newReceipt.intoMoney),
//         details: detailsResponse.data.map((d, index) => ({
//           ...d,
//           stt: index + 1,
//         })),
//       };

//       onSuccess(updatedReceipt);
//       setReceiptData({ dateReceipt: new Date().toISOString().split('T')[0], details: [{ productID: '', unitID: '', quantityImport: 0, importPrice: 0, intoMoney: 0 }] });
//       setErrors({});
//       alert('Thêm phiếu nhập thành công!');
//     } catch (error) {
//       console.error('Lỗi khi thêm phiếu nhập:', error);
//       alert('Không thể thêm phiếu nhập.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-[#2c3e50] p-6 rounded-lg shadow-lg mb-6">
//       <h3 className="text-xl font-semibold text-white mb-4">THÊM PHIẾU NHẬP</h3>
//       <div className="mb-4">
//         <label htmlFor="dateReceipt" className="block text-white mb-1">Ngày nhập hàng</label>
//         <input
//           type="date"
//           id="dateReceipt"
//           value={receiptData.dateReceipt}
//           onChange={(e) => setReceiptData({ ...receiptData, dateReceipt: e.target.value })}
//           className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
//         />
//         {errors.dateReceipt && <p className="text-red-400 text-sm mt-1">{errors.dateReceipt}</p>}
//       </div>
//       <ImportDetailForm
//         details={receiptData.details}
//         setDetails={(newDetails) => setReceiptData({ ...receiptData, details: newDetails })}
//         products={products}
//         units={units}
//         errors={errors}
//       />
//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//       >
//         Lưu phiếu nhập
//       </button>
//     </form>
//   );
// };

// export default ImportReceiptForm;