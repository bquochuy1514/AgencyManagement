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
    
    // Auto calculate intoMoney
    if (name === 'quantityImport' || name === 'importPrice') {
      updatedFormData.intoMoney = (
        parseFloat(updatedFormData.quantityImport || 0) * 
        parseFloat(updatedFormData.importPrice || 0)
      ).toFixed(2);
    }
    
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-white text-gray-800 p-8 rounded-2xl w-[500px] shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiPlus className="text-blue-600" />
            Thêm Chi Tiết Phiếu Nhập #{receiptId}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            disabled={loading}
          >
            <FiX className="text-gray-500 hover:text-gray-700 text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Selection */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiPackage className="text-gray-400" />
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

          {/* Unit Selection */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiPackage className="text-gray-400" />
            </div>
            <select
              name="unitID"
              value={formData.unitID}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
              required
              disabled={loading}
            >
              <option value="">Chọn đơn vị tính</option>
              {units.map(unit => (
                <option key={unit.unitID} value={unit.unitID}>
                  {unit.unitName}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiHash className="text-gray-400" />
            </div>
            <input
              type="number"
              name="quantityImport"
              value={formData.quantityImport}
              onChange={handleChange}
              min="1"
              step="1"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
              placeholder="Số lượng"
              required
              disabled={loading}
            />
          </div>

          {/* Price */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiDollarSign className="text-gray-400" />
            </div>
            <input
              type="number"
              name="importPrice"
              value={formData.importPrice}
              onChange={handleChange}
              min="0"
              step="1000"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
              placeholder="Giá nhập"
              required
              disabled={loading}
            />
          </div>

          {/* Total Money */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiDollarSign className="text-gray-400" />
            </div>
            <input
              type="number"
              name="intoMoney"
              value={formData.intoMoney}
              readOnly
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              placeholder="Thành tiền"
            />
          </div>

          <div className="flex justify-end mt-8 space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium border border-gray-300"
              disabled={loading}
            >
              Hủy
            </button>
            <button
              type="submit"
              className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center gap-2 ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : 'Thêm chi tiết'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImportDetailForm;


// phần này dùng để fetch api
// import React from 'react';

// const ImportDetailForm = ({ details, setDetails, products, units, errors }) => {
//   const handleDetailChange = (index, field, value) => {
//     const newDetails = [...details];
//     newDetails[index] = { ...newDetails[index], [field]: value };

//     if (field === 'productID') {
//       const selectedProduct = products.find(p => p.productID === parseInt(value));
//       if (selectedProduct) {
//         newDetails[index].unitID = selectedProduct.unit.unitID;
//         newDetails[index].importPrice = selectedProduct.importPrice;
//       }
//     }

//     if (field === 'quantityImport' || field === 'importPrice') {
//       const quantity = parseInt(newDetails[index].quantityImport) || 0;
//       const price = parseInt(newDetails[index].importPrice) || 0;
//       newDetails[index].intoMoney = quantity * price;
//     }

//     setDetails(newDetails);
//   };

//   const addDetail = () => {
//     setDetails([...details, { productID: '', unitID: '', quantityImport: 0, importPrice: 0, intoMoney: 0 }]);
//   };

//   const removeDetail = (index) => {
//     if (details.length > 1) {
//       setDetails(details.filter((_, i) => i !== index));
//     }
//   };

//   return (
//     <div className="mb-4">
//       <h4 className="text-lg font-semibold text-white mb-2">Chi tiết mặt hàng</h4>
//       {details.map((detail, index) => (
//         <div key={index} className="flex space-x-4 mb-4 p-4 bg-gray-800 rounded-md">
//           <div className="flex-1">
//             <label className="block text-white mb-1">Sản phẩm</label>
//             <select
//               value={detail.productID}
//               onChange={(e) => handleDetailChange(index, 'productID', e.target.value)}
//               className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
//             >
//               <option value="">Chọn sản phẩm</option>
//               {products.map(product => (
//                 <option key={product.productID} value={product.productID}>
//                   {product.productName}
//                 </option>
//               ))}
//             </select>
//             {errors[`productID_${index}`] && (
//               <p className="text-red-400 text-sm mt-1">{errors[`productID_${index}`]}</p>
//             )}
//           </div>
//           <div className="flex-1">
//             <label className="block text-white mb-1">Đơn vị tính</label>
//             <select
//               value={detail.unitID}
//               onChange={(e) => handleDetailChange(index, 'unitID', e.target.value)}
//               className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
//               disabled
//             >
//               <option value="">Chọn đơn vị</option>
//               {units.map(unit => (
//                 <option key={unit.unitID} value={unit.unitID}>
//                   {unit.unitName}
//                 </option>
//               ))}
//             </select>
//             {errors[`unitID_${index}`] && (
//               <p className="text-red-400 text-sm mt-1">{errors[`unitID_${index}`]}</p>
//             )}
//           </div>
//           <div className="flex-1">
//             <label className="block text-white mb-1">Số lượng nhập</label>
//             <input
//               type="number"
//               value={detail.quantityImport}
//               onChange={(e) => handleDetailChange(index, 'quantityImport', e.target.value)}
//               className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
//             />
//             {errors[`quantityImport_${index}`] && (
//               <p className="text-red-400 text-sm mt-1">{errors[`quantityImport_${index}`]}</p>
//             )}
//           </div>
//           <div className="flex-1">
//             <label className="block text-white mb-1">Giá nhập</label>
//             <input
//               type="number"
//               value={detail.importPrice}
//               onChange={(e) => handleDetailChange(index, 'importPrice', e.target.value)}
//               className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
//             />
//             {errors[`importPrice_${index}`] && (
//               <p className="text-red-400 text-sm mt-1">{errors[`importPrice_${index}`]}</p>
//             )}
//           </div>
//           <div className="flex-1">
//             <label className="block text-white mb-1">Thành tiền</label>
//             <input
//               type="number"
//               value={detail.intoMoney}
//               readOnly
//               className="border border-gray-600 p-2 w-full bg-gray-800 text-white rounded-md"
//             />
//           </div>
//           {details.length > 1 && (
//             <button
//               type="button"
//               onClick={() => removeDetail(index)}
//               className="text-red-400 hover:text-red-500 mt-8"
//             >
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           )}
//         </div>
//       ))}
//       <button
//         type="button"
//         onClick={addDetail}
//         className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
//       >
//         Thêm mặt hàng
//       </button>
//     </div>
//   );
// };

// export default ImportDetailForm;