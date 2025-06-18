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



import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { addImportReceipt, addImportDetail } from "../../services/receiptService";
import { getAllProducts } from "../../services/productService";
import { getAllUnits } from "../../services/unitService";

const ImportReceiptForm = ({ onCancel, onSuccess }) => {
  const [products, setProducts] = useState([]);
  const [units, setUnits] = useState([]);
  const [errors, setErrors] = useState({});

  const [receiptData, setReceiptData] = useState({
    dateReceipt: new Date().toISOString().split("T")[0],
    details: [{ productID: "", unitID: "", quantityImport: 0, importPrice: 0 }],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await getAllProducts();
        const unitsRes = await getAllUnits();
        setProducts(productsRes.data);
        setUnits(unitsRes.data);
      } catch (err) {
        toast.error("Lỗi khi tải dữ liệu sản phẩm hoặc đơn vị.");
      }
    };
    fetchData();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!receiptData.dateReceipt) newErrors.dateReceipt = "Ngày lập phiếu không được để trống";
    receiptData.details.forEach((detail, index) => {
      if (!detail.productID) newErrors[`productID_${index}`] = "Vui lòng chọn sản phẩm";
      if (!detail.unitID) newErrors[`unitID_${index}`] = "Vui lòng chọn đơn vị";
      if (!detail.quantityImport || detail.quantityImport <= 0)
        newErrors[`quantityImport_${index}`] = "Số lượng phải lớn hơn 0";
      if (!detail.importPrice || detail.importPrice <= 0)
        newErrors[`importPrice_${index}`] = "Giá nhập phải lớn hơn 0";
    });
    return newErrors;
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDetails = [...receiptData.details];
    updatedDetails[index] = { ...updatedDetails[index], [name]: value };
    setReceiptData({ ...receiptData, details: updatedDetails });
    setErrors({ ...errors, [`${name}_${index}`]: null });
  };

  const addDetail = () => {
    setReceiptData({
      ...receiptData,
      details: [...receiptData.details, { productID: "", unitID: "", quantityImport: 0, importPrice: 0 }],
    });
  };

  const removeDetail = (index) => {
    const updatedDetails = receiptData.details.filter((_, i) => i !== index);
    setReceiptData({ ...receiptData, details: updatedDetails });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const first = receiptData.details[0];
      const res = await addImportReceipt({
        dateReceipt: receiptData.dateReceipt,
        productID: parseInt(first.productID),
        unitID: parseInt(first.unitID),
        quantityImport: parseInt(first.quantityImport),
        importPrice: parseInt(first.importPrice),
      });

      const receiptId = res.data.importReceiptID;
      const detailRes = await addImportDetail(
        receiptData.details.map((d) => ({
          importReceiptID: { importReceiptID: receiptId },
          productID: { productID: parseInt(d.productID) },
          unitID: { unitID: parseInt(d.unitID) },
          quantityImport: parseInt(d.quantityImport),
          importPrice: parseInt(d.importPrice),
        }))
      );

      if (detailRes.status === "CREATED") {
        const totalPrice = detailRes.data.reduce((sum, item) => sum + item.intoMoney, 0);
        onSuccess({
          importReceiptID: receiptId,
          dateReceipt: receiptData.dateReceipt,
          totalPrice,
          details: detailRes.data.map((item, index) => ({
            stt: index + 1,
            productID: item.productID,
            productName: item.productName,
            unitID: item.unitID,
            unitName: item.unitName,
            quantityImport: item.quantityImport,
            importPrice: item.importPrice,
            intoMoney: item.intoMoney,
          })),
        });
        toast.success("Thêm phiếu nhập thành công!");
        setReceiptData({
          dateReceipt: new Date().toISOString().split("T")[0],
          details: [{ productID: "", unitID: "", quantityImport: 0, importPrice: 0 }],
        });
        setErrors({});
      }
    } catch (err) {
      toast.error("Lỗi khi thêm phiếu nhập!");
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
            value={receiptData.dateReceipt}
            onChange={(e) =>
              setReceiptData({ ...receiptData, dateReceipt: e.target.value })
            }
            className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white"
          />
          {errors.dateReceipt && (
            <p className="text-red-400 text-sm mt-1 bg-red-500/20 p-2 rounded">{errors.dateReceipt}</p>
          )}
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-300">Danh sách mặt hàng</h3>
          {receiptData.details.map((detail, index) => (
            <div key={index} className="border-t border-gray-700 pt-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Sản phẩm</label>
                  <select
                    name="productID"
                    value={detail.productID}
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white"
                  >
                    <option value="">Chọn sản phẩm</option>
                    {products.map((product) => (
                      <option key={product.productID} value={product.productID}>
                        {product.productName}
                      </option>
                    ))}
                  </select>
                  {errors[`productID_${index}`] && (
                    <p className="text-red-400 text-sm mt-1 bg-red-500/20 p-2 rounded">
                      {errors[`productID_${index}`]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Đơn vị tính</label>
                  <select
                    name="unitID"
                    value={detail.unitID}
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white"
                  >
                    <option value="">Chọn đơn vị</option>
                    {units.map((unit) => (
                      <option key={unit.unitID} value={unit.unitID}>
                        {unit.unitName}
                      </option>
                    ))}
                  </select>
                  {errors[`unitID_${index}`] && (
                    <p className="text-red-400 text-sm mt-1 bg-red-500/20 p-2 rounded">
                      {errors[`unitID_${index}`]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Số lượng</label>
                  <input
                    type="number"
                    name="quantityImport"
                    value={detail.quantityImport}
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white"
                    placeholder="Số lượng"
                  />
                  {errors[`quantityImport_${index}`] && (
                    <p className="text-red-400 text-sm mt-1 bg-red-500/20 p-2 rounded">
                      {errors[`quantityImport_${index}`]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Giá nhập</label>
                  <input
                    type="number"
                    name="importPrice"
                    value={detail.importPrice}
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white"
                    placeholder="Giá nhập"
                  />
                  {errors[`importPrice_${index}`] && (
                    <p className="text-red-400 text-sm mt-1 bg-red-500/20 p-2 rounded">
                      {errors[`importPrice_${index}`]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Thành tiền</label>
                  <input
                    type="number"
                    value={detail.quantityImport * detail.importPrice || 0}
                    readOnly
                    className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white bg-gray-700"
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
            className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImportReceiptForm;