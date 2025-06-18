// import React, { useState, useEffect } from "react";
// import { ProductContext } from "../../App";
// import { addImportReceipt, addImportDetail } from "../../services/receiptService";
// import { getAllProducts } from "../../services/productService";
// import { getAllUnits } from "../../services/unitService";
// import { toast } from "react-toastify";

// const ImportReceiptForm = ({ onCancel, onSuccess }) => {
//   const [products, setProducts] = useState([]);
//   const [units, setUnits] = useState([]);
//   const [errors, setErrors] = useState({});

//   const [receiptData, setReceiptData] = useState({
//     dateReceipt: new Date().toISOString().split("T")[0],
//     details: [{ productID: "", unitID: "", quantityImport: 0, importPrice: 0 }],
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const productsRes = await getAllProducts();
//         const unitsRes = await getAllUnits();
//         console.log("📦 Units:", unitsRes.data);
//         setProducts(productsRes.data);
//         setUnits(unitsRes.data);
//       } catch (err) {
//         toast.error("Lỗi khi tải dữ liệu sản phẩm hoặc đơn vị.");
//         console.error(err);
//       }
//     };
//     fetchData();
//   }, []);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!receiptData.dateReceipt) newErrors.dateReceipt = "Ngày lập phiếu không được để trống";
//     receiptData.details.forEach((detail, index) => {
//       if (!detail.productID) newErrors[`productID_${index}`] = "Vui lòng chọn sản phẩm";
//       if (!detail.unitID) newErrors[`unitID_${index}`] = "Vui lòng chọn đơn vị";
//       if (!detail.quantityImport || detail.quantityImport <= 0)
//         newErrors[`quantityImport_${index}`] = "Số lượng phải lớn hơn 0";
//       if (!detail.importPrice || detail.importPrice <= 0)
//         newErrors[`importPrice_${index}`] = "Giá nhập phải lớn hơn 0";
//     });
//     return newErrors;
//   };

//   const handleChange = (e, index) => {
//     const { name, value } = e.target;
//     const updatedDetails = [...receiptData.details];
//     updatedDetails[index] = { ...updatedDetails[index], [name]: value };
//     setReceiptData({ ...receiptData, details: updatedDetails });
//     setErrors({ ...errors, [`${name}_${index}`]: null });
//   };

//   const addDetail = () => {
//     setReceiptData({
//       ...receiptData,
//       details: [...receiptData.details, { productID: "", unitID: "", quantityImport: 0, importPrice: 0 }],
//     });
//   };

//   const removeDetail = (index) => {
//     const updatedDetails = receiptData.details.filter((_, i) => i !== index);
//     setReceiptData({ ...receiptData, details: updatedDetails });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formErrors = validateForm();
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return;
//     }

//     try {
//       const first = receiptData.details[0];
//       const res = await addImportReceipt({
//         dateReceipt: receiptData.dateReceipt,
//         productID: parseInt(first.productID),
//         unitID: parseInt(first.unitID),
//         quantityImport: parseInt(first.quantityImport),
//         importPrice: parseInt(first.importPrice),
//       });

//       const receiptId = res.data.importReceiptID;
//       const detailRes = await addImportDetail(
//         receiptData.details.map((d) => ({
//           importReceiptID: { importReceiptID: receiptId },
//           productID: { productID: parseInt(d.productID) },
//           unitID: { unitID: parseInt(d.unitID) },
//           quantityImport: parseInt(d.quantityImport),
//           importPrice: parseInt(d.importPrice),
//         }))
//       );

//       if (detailRes.status === "CREATED") {
//         const totalPrice = detailRes.data.reduce((sum, item) => sum + item.intoMoney, 0);
//         onSuccess({
//           importReceiptID: receiptId,
//           dateReceipt: receiptData.dateReceipt,
//           totalPrice,
//           details: detailRes.data.map((item, index) => ({
//             stt: index + 1,
//             productID: item.productID,
//             productName: item.productName,
//             unitID: item.unitID,
//             unitName: item.unitName,
//             quantityImport: item.quantityImport,
//             importPrice: item.importPrice,
//             intoMoney: item.intoMoney,
//           })),
//         });
//         toast.success("Thêm phiếu nhập thành công!");
//         setReceiptData({
//           dateReceipt: new Date().toISOString().split("T")[0],
//           details: [{ productID: "", unitID: "", quantityImport: 0, importPrice: 0 }],
//         });
//         setErrors({});
//       }
//     } catch (err) {
//       toast.error("Lỗi khi thêm phiếu nhập!");
//       console.error(err);
//     }
//   };
//   return (
//     <div className="bg-[#2a3b4c] rounded-lg shadow-md p-6 text-white">
//       <h2 className="text-2xl font-semibold mb-4">Thêm Phiếu Nhập Mới</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium">Ngày lập phiếu</label>
//           <input
//             type="date"
//             name="dateReceipt"
//             value={receiptData.dateReceipt}
//             onChange={(e) =>
//               setReceiptData({ ...receiptData, dateReceipt: e.target.value })
//             }
//             className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
//           />
//           {errors.dateReceipt && (
//             <p className="text-red-400 text-sm mt-1">{errors.dateReceipt}</p>
//           )}
//         </div>
//         <div>
//           <h3 className="text-lg font-medium">Danh sách mặt hàng</h3>
//           {receiptData.details.map((detail, index) => (
//             <div key={index} className="border-t border-gray-600 pt-4 mt-4">
//               <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium">Sản phẩm</label>
//                   <select
//                     name="productID"
//                     value={detail.productID}
//                     onChange={(e) => handleChange(e, index)}
//                     className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 text-white"
//                   >
//                     <option value="">Chọn sản phẩm</option>
//                     {products.map((product) => (
//                       <option key={product.productID} value={product.productID}>
//                         {product.productName}
//                       </option>
//                     ))}
//                   </select>
//                   {errors[`productID_${index}`] && (
//                     <p className="text-red-400 text-sm mt-1">
//                       {errors[`productID_${index}`]}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium">Đơn vị tính</label>
//                   <select
//                     name="unitID"
//                     value={detail.unitID}
//                     onChange={(e) => handleChange(e, index)}
//                     className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 text-white"
//                   >
//                     <option value="">Chọn đơn vị</option>
//                     {units.map((unit) => (
//                       <option key={unit.unitID} value={unit.unitID}>
//                         {unit.unitName}
//                       </option>
//                     ))}
//                   </select>
//                   {errors[`unitID_${index}`] && (
//                     <p className="text-red-400 text-sm mt-1">
//                       {errors[`unitID_${index}`]}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium">Số lượng</label>
//                   <input
//                     type="number"
//                     name="quantityImport"
//                     value={detail.quantityImport}
//                     onChange={(e) => handleChange(e, index)}
//                     className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 text-white"
//                     placeholder="Số lượng"
//                   />
//                   {errors[`quantityImport_${index}`] && (
//                     <p className="text-red-400 text-sm mt-1">
//                       {errors[`quantityImport_${index}`]}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium">Giá nhập</label>
//                   <input
//                     type="number"
//                     name="importPrice"
//                     value={detail.importPrice}
//                     onChange={(e) => handleChange(e, index)}
//                     className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 text-white"
//                     placeholder="Giá nhập"
//                   />
//                   {errors[`importPrice_${index}`] && (
//                     <p className="text-red-400 text-sm mt-1">
//                       {errors[`importPrice_${index}`]}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium">Thành tiền</label>
//                   <input
//                     type="number"
//                     value={detail.quantityImport * detail.importPrice || 0}
//                     readOnly
//                     className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 text-white bg-gray-700"
//                   />
//                 </div>
//               </div>
//               {receiptData.details.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeDetail(index)}
//                   className="mt-2 text-red-400 hover:text-red-500"
//                 >
//                   Xóa mặt hàng
//                 </button>
//               )}
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addDetail}
//             className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
//           >
//             + Thêm mặt hàng
//           </button>
//         </div>
//         {errors.form && (
//           <p className="text-red-400 text-sm mt-2">{errors.form}</p>
//         )}
//         <div className="flex space-x-4">
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
//           >
//             Thêm phiếu
//           </button>
//           <button
//             type="button"
//             onClick={onCancel}
//             className="w-full bg-gray-600 px-4 py-2 rounded-md hover:bg-gray-700 transition text-white"
//           >
//             Hủy
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ImportReceiptForm;



import React, { useState, useEffect, useContext } from 'react';
import { addImportReceipt, getAllSuppliers } from '../../services/receiptService';
import { ProductContext } from '../../App';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

const ImportReceiptForm = ({ onCancel, onSuccess }) => {
  const { products, units } = useContext(ProductContext);
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    dateReceipt: new Date().toISOString().split('T')[0],
    supplierID: '',
    details: [],
    totalMoney: 0,
    paymentAmount: 0,
    remainAmount: 0,
  });
  const [errors, setErrors] = useState({});
  const [currentDetail, setCurrentDetail] = useState({
    productID: '',
    quantityImport: '',
    importPrice: '',
    unitID: '',
  });

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await getAllSuppliers();
        setSuppliers(response.data);
      } catch (err) {
        toast.error('Lỗi khi tải danh sách nhà cung cấp!');
      }
    };
    fetchSuppliers();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.dateReceipt) newErrors.dateReceipt = 'Ngày lập phiếu không được để trống';
    if (!formData.supplierID) newErrors.supplierID = 'Vui lòng chọn nhà cung cấp';
    if (formData.details.length === 0) newErrors.details = 'Phải có ít nhất một mặt hàng';
    if (formData.totalMoney <= 0) newErrors.totalMoney = 'Tổng tiền phải lớn hơn 0';
    if (formData.paymentAmount < 0) newErrors.paymentAmount = 'Số tiền trả không được âm';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    updatedFormData.remainAmount = Math.max(0, parseInt(updatedFormData.totalMoney || 0) - parseInt(updatedFormData.paymentAmount || 0));
    setFormData(updatedFormData);
    setErrors({ ...errors, [name]: null });
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    const updatedDetail = { ...currentDetail, [name]: value };
    if (name === 'productID') {
      const product = products.find(p => p.productID === parseInt(value));
      if (product) {
        updatedDetail.unitID = product.unit.unitID.toString();
        updatedDetail.importPrice = product.importPrice || 0;
      }
    }
    setCurrentDetail(updatedDetail);
  };

  const addDetail = () => {
    if (!currentDetail.productID || !currentDetail.quantityImport || !currentDetail.importPrice || !currentDetail.unitID) {
      toast.error('Vui lòng điền đầy đủ thông tin mặt hàng!');
      return;
    }
    const product = products.find(p => p.productID === parseInt(currentDetail.productID));
    const unit = units.find(u => u.unitID === parseInt(currentDetail.unitID));
    if (!product || !unit) {
      toast.error('Sản phẩm hoặc đơn vị không tồn tại!');
      return;
    }
    const newDetail = {
      productID: { productID: parseInt(currentDetail.productID) },
      unitID: { unitID: parseInt(currentDetail.unitID) },
      quantityImport: parseInt(currentDetail.quantityImport),
      importPrice: parseInt(currentDetail.importPrice),
      intoMoney: parseInt(currentDetail.quantityImport) * parseInt(currentDetail.importPrice),
      productName: product.productName,
      unitName: unit.unitName,
    };
    const updatedDetails = [...formData.details, newDetail];
    const newTotalMoney = updatedDetails.reduce((sum, d) => sum + d.intoMoney, 0);
    setFormData({
      ...formData,
      details: updatedDetails,
      totalMoney: newTotalMoney,
      remainAmount: newTotalMoney - parseInt(formData.paymentAmount || 0),
    });
    setCurrentDetail({ productID: '', quantityImport: '', importPrice: '', unitID: '' });
  };

  const removeDetail = (index) => {
    const updatedDetails = formData.details.filter((_, i) => i !== index);
    const newTotalMoney = updatedDetails.reduce((sum, d) => sum + d.intoMoney, 0);
    setFormData({
      ...formData,
      details: updatedDetails,
      totalMoney: newTotalMoney,
      remainAmount: newTotalMoney - parseInt(formData.paymentAmount || 0),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      const receiptData = {
        supplierID: { supplierID: parseInt(formData.supplierID) },
        dateReceipt: formData.dateReceipt,
        totalMoney: parseInt(formData.totalMoney),
        paymentAmount: parseInt(formData.paymentAmount),
        remainAmount: parseInt(formData.remainAmount),
        details: formData.details.map(detail => ({
          productID: detail.productID,
          unitID: detail.unitID,
          quantityImport: detail.quantityImport,
          importPrice: detail.importPrice,
        })),
      };
      await addImportReceipt(receiptData);
      toast.success('Thêm phiếu nhập thành công!');
      onSuccess();
    } catch (err) {
      toast.error('Lỗi khi thêm phiếu nhập!');
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-white mb-6">
      <h2 className="text-3xl font-bold text-yellow-400 mb-4">Thêm Phiếu Nhập Mới</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300">Ngày lập phiếu</label>
          <input
            type="date"
            name="dateReceipt"
            value={formData.dateReceipt}
            onChange={handleChange}
            className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white"
          />
          {errors.dateReceipt && <p className="text-red-400 text-sm mt-1">{errors.dateReceipt}</p>}
        </div>
        <div>
          <label className="block text-gray-300">Nhà cung cấp</label>
          <select
            name="supplierID"
            value={formData.supplierID}
            onChange={handleChange}
            className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white"
          >
            <option value="">Chọn nhà cung cấp</option>
            {suppliers.map(supplier => (
              <option key={supplier.supplierID} value={supplier.supplierID}>{supplier.supplierName}</option>
            ))}
          </select>
          {errors.supplierID && <p className="text-red-400 text-sm mt-1">{errors.supplierID}</p>}
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-300 mb-2">Thêm mặt hàng</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm text-gray-300">Sản phẩm</label>
              <select
                name="productID"
                value={currentDetail.productID}
                onChange={handleDetailChange}
                className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white"
              >
                <option value="">Chọn sản phẩm</option>
                {products.map(product => (
                  <option key={product.productID} value={product.productID}>{product.productName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-300">Đơn vị</label>
              <select
                name="unitID"
                value={currentDetail.unitID}
                onChange={handleDetailChange}
                className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white"
              >
                <option value="">Chọn đơn vị</option>
                {units.map(unit => (
                  <option key={unit.unitID} value={unit.unitID}>{unit.unitName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-300">Số lượng</label>
              <input
                type="number"
                name="quantityImport"
                value={currentDetail.quantityImport}
                onChange={handleDetailChange}
                placeholder="Số lượng"
                className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300">Giá nhập</label>
              <input
                type="number"
                name="importPrice"
                value={currentDetail.importPrice}
                onChange={handleDetailChange}
                placeholder="Giá nhập"
                className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white"
                min="0"
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={addDetail}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                + Thêm
              </button>
            </div>
          </div>
          {errors.details && <p className="text-red-400 text-sm mt-1">{errors.details}</p>}
        </div>
        {formData.details.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-300 mb-2">Danh sách mặt hàng</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700 bg-gray-800 text-gray-300">
                  <th className="py-3 px-4">STT</th>
                  <th className="py-3 px-4">Sản phẩm</th>
                  <th className="py-3 px-4">Đơn vị</th>
                  <th className="py-3 px-4">Số lượng</th>
                  <th className="py-3 px-4">Giá nhập</th>
                  <th className="py-3 px-4">Thành tiền</th>
                  <th className="py-3 px-4">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {formData.details.map((detail, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{detail.productName}</td>
                    <td className="px-4 py-3">{detail.unitName}</td>
                    <td className="px-4 py-3">{detail.quantityImport}</td>
                    <td className="px-4 py-3">{new Intl.NumberFormat('vi-VN').format(detail.importPrice)} đ</td>
                    <td className="px-4 py-3">{new Intl.NumberFormat('vi-VN').format(detail.intoMoney)} đ</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => removeDetail(index)}
                        className="text-red-400 hover:text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div>
          <label className="block text-gray-300">Tổng tiền</label>
          <input
            type="number"
            name="totalMoney"
            value={formData.totalMoney}
            readOnly
            className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white cursor-not-allowed"
          />
          {errors.totalMoney && <p className="text-red-400 text-sm mt-1">{errors.totalMoney}</p>}
        </div>
        <div>
          <label className="block text-gray-300">Số tiền trả</label>
          <input
            type="number"
            name="paymentAmount"
            value={formData.paymentAmount}
            onChange={handleChange}
            className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white"
            min="0"
          />
          {errors.paymentAmount && <p className="text-red-400 text-sm mt-1">{errors.paymentAmount}</p>}
        </div>
        <div>
          <label className="block text-gray-300">Còn lại</label>
          <input
            type="number"
            name="remainAmount"
            value={formData.remainAmount}
            readOnly
            className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white cursor-not-allowed"
          />
        </div>
        <div className="flex space-x-4 mt-6">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Thêm phiếu
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImportReceiptForm;