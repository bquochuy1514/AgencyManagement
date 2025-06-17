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
// import React, { useState } from 'react';

// const ExportReceiptForm = ({ onCancel, onSuccess }) => {
//   const [receiptData, setReceiptData] = useState({
//     dateReceipt: new Date().toISOString().split('T')[0],
//     totalMoney: '',
//     paymentAmount: '',
//     remainAmount: '',
//     agentID: '',
//   });
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};
//     if (!receiptData.dateReceipt) newErrors.dateReceipt = 'Ngày lập phiếu không được để trống';
//     if (!receiptData.totalMoney || receiptData.totalMoney < 0)
//       newErrors.totalMoney = 'Tổng tiền phải là số không âm';
//     if (!receiptData.paymentAmount || receiptData.paymentAmount < 0)
//       newErrors.paymentAmount = 'Số tiền trả phải là số không âm';
//     if (!receiptData.remainAmount || receiptData.remainAmount < 0)
//       newErrors.remainAmount = 'Số tiền còn lại phải là số không âm';
//     return newErrors;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setReceiptData({ ...receiptData, [name]: value });
//     setErrors({ ...errors, [name]: null });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formErrors = validateForm();
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return;
//     }

//     onSuccess({
//       dateReceipt: receiptData.dateReceipt,
//       totalMoney: parseInt(receiptData.totalMoney),
//       paymentAmount: parseInt(receiptData.paymentAmount),
//       remainAmount: parseInt(receiptData.remainAmount),
//       agentID: receiptData.agentID,
//     });
//     setReceiptData({
//       dateReceipt: new Date().toISOString().split('T')[0],
//       totalMoney: '',
//       paymentAmount: '',
//       remainAmount: '',
//       agentID: '',
//     });
//     setErrors({});
//   };

//   return (
//     <div className="bg-[#2a3b4c] rounded-lg shadow-md p-6 text-white">
//       <h2 className="text-2xl font-semibold mb-4">Thêm Phiếu Xuất Mới</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium">Ngày lập phiếu</label>
//           <input
//             type="date"
//             name="dateReceipt"
//             value={receiptData.dateReceipt}
//             onChange={handleChange}
//             className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
//           />
//           {errors.dateReceipt && <p className="text-red-400 text-sm mt-1">{errors.dateReceipt}</p>}
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Tổng tiền</label>
//           <input
//             type="number"
//             name="totalMoney"
//             value={receiptData.totalMoney}
//             onChange={handleChange}
//             className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
//             placeholder="Nhập tổng tiền"
//           />
//           {errors.totalMoney && <p className="text-red-400 text-sm mt-1">{errors.totalMoney}</p>}
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Số tiền trả</label>
//           <input
//             type="number"
//             name="paymentAmount"
//             value={receiptData.paymentAmount}
//             onChange={handleChange}
//             className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
//             placeholder="Nhập số tiền trả"
//           />
//           {errors.paymentAmount && <p className="text-red-400 text-sm mt-1">{errors.paymentAmount}</p>}
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Còn lại</label>
//           <input
//             type="number"
//             name="remainAmount"
//             value={receiptData.remainAmount}
//             onChange={handleChange}
//             className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
//             placeholder="Nhập số tiền còn lại"
//           />
//           {errors.remainAmount && <p className="text-red-400 text-sm mt-1">{errors.remainAmount}</p>}
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Đại lý</label>
//           <input
//             type="text"
//             name="agentID"
//             value={receiptData.agentID}
//             onChange={handleChange}
//             className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
//             placeholder="Nhập mã đại lý"
//           />
//         </div>
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

// export default ExportReceiptForm;
import React, { useState, useEffect, useContext } from 'react';
import { addExportReceipt } from '../../services/receiptService';
import { getAllAgents } from '../../services/agentService';
import { ProductContext } from '../../App';
import { toast } from 'react-toastify';

const ExportReceiptForm = ({ onCancel, onSuccess }) => {
  const { products } = useContext(ProductContext);
  const [agents, setAgents] = useState([]);
  const [formData, setFormData] = useState({
    dateReceipt: new Date().toISOString().split('T')[0],
    agentID: '',
    details: [],
    totalMoney: 0,
    paymentAmount: 0,
    remainAmount: 0,
  });
  const [errors, setErrors] = useState({});
  const [currentDetail, setCurrentDetail] = useState({
    productID: '',
    quantityExport: '',
    exportPrice: '',
  });

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await getAllAgents();
        setAgents(response.data);
      } catch (err) {
        toast.error('Lỗi khi tải danh sách đại lý!');
      }
    };
    fetchAgents();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.dateReceipt) newErrors.dateReceipt = 'Ngày lập phiếu không được để trống';
    if (!formData.agentID) newErrors.agentID = 'Vui lòng chọn đại lý';
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
    setCurrentDetail({ ...currentDetail, [name]: value });
  };

  const addDetail = () => {
    if (!currentDetail.productID || !currentDetail.quantityExport || !currentDetail.exportPrice) {
      toast.error('Vui lòng điền đầy đủ thông tin mặt hàng!');
      return;
    }
    const product = products.find(p => p.productID === parseInt(currentDetail.productID));
    if (!product) {
      toast.error('Sản phẩm không tồn tại!');
      return;
    }
    const newDetail = {
      productID: { productID: parseInt(currentDetail.productID) },
      unitID: { unitID: product.unit.unitID },
      quantityExport: parseInt(currentDetail.quantityExport),
      exportPrice: parseInt(currentDetail.exportPrice),
      intoMoney: parseInt(currentDetail.quantityExport) * parseInt(currentDetail.exportPrice),
      productName: product.productName,
      unitName: product.unit.unitName,
    };
    const updatedDetails = [...formData.details, newDetail];
    const newTotalMoney = updatedDetails.reduce((sum, d) => sum + d.intoMoney, 0);
    setFormData({
      ...formData,
      details: updatedDetails,
      totalMoney: newTotalMoney,
      remainAmount: newTotalMoney - parseInt(formData.paymentAmount || 0),
    });
    setCurrentDetail({ productID: '', quantityExport: '', exportPrice: '' });
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
        agentID: { agentID: parseInt(formData.agentID) },
        totalMoney: parseInt(formData.totalMoney),
        paymentAmount: parseInt(formData.paymentAmount),
        remainAmount: parseInt(formData.remainAmount),
      };
      const response = await addExportReceipt(receiptData);
      const exportReceiptID = response.data.exportReceiptID;
      for (const detail of formData.details) {
        await addExportDetail({
          exportReceiptID: { exportReceiptID },
          productID: detail.productID,
          unitID: detail.unitID,
          quantityExport: detail.quantityExport,
          exportPrice: detail.exportPrice,
        });
      }
      toast.success('Thêm phiếu xuất thành công!');
      onSuccess();
    } catch (err) {
      toast.error('Lỗi khi thêm phiếu xuất!');
    }
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
            value={formData.dateReceipt}
            onChange={handleChange}
            className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 text-white"
          />
          {errors.dateReceipt && <p className="text-red-400 text-sm mt-1">{errors.dateReceipt}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Đại lý</label>
          <select
            name="agentID"
            value={formData.agentID}
            onChange={handleChange}
            className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 text-white"
          >
            <option value="">Chọn đại lý</option>
            {agents.map(agent => (
              <option key={agent.agentID} value={agent.agentID}>{agent.agentName}</option>
            ))}
          </select>
          {errors.agentID && <p className="text-red-400 text-sm mt-1">{errors.agentID}</p>}
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Thêm mặt hàng</h3>
          <div className="grid grid-cols-4 gap-4">
            <select
              name="productID"
              value={currentDetail.productID}
              onChange={handleDetailChange}
              className="bg-[#1a2634] border border-gray-600 rounded-md p-2 text-white"
            >
              <option value="">Chọn sản phẩm</option>
              {products.map(product => (
                <option key={product.productID} value={product.productID}>{product.productName}</option>
              ))}
            </select>
            <input
              type="number"
              name="quantityExport"
              value={currentDetail.quantityExport}
              onChange={handleDetailChange}
              placeholder="Số lượng"
              className="bg-[#1a2634] border border-gray-600 rounded-md p-2 text-white"
            />
            <input
              type="number"
              name="exportPrice"
              value={currentDetail.exportPrice}
              onChange={handleDetailChange}
              placeholder="Giá xuất"
              className="bg-[#1a2634] border border-gray-600 rounded-md p-2 text-white"
            />
            <button
              type="button"
              onClick={addDetail}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Thêm
            </button>
          </div>
          {errors.details && <p className="text-red-400 text-sm mt-1">{errors.details}</p>}
        </div>
        {formData.details.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-2">Danh sách mặt hàng</h3>
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-[#2a3b4c]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300">STT</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300">Sản phẩm</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300">Đơn vị</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300">Số lượng</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300">Giá xuất</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300">Thành tiền</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700 text-gray-200">
                {formData.details.map((detail, index) => (
                  <tr key={index}>
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-3 py-3">{detail.productName}</td>
                    <td className="px-3 py-3">{detail.unitName}</td>
                    <td className="px-6 py-3">{detail.quantityExport}</td>
                    <td className="px-6 py-3">{new Intl.NumberFormat('vi-VN').format(detail.quantityExport)} đ</td>
                    <td className="px-6 py-3">{new Intl.NumberFormat('vi-VN').format(detail.intoMoney)} đ</td>
                    <td className="px-6 py-3">
                      <button
                        type="button"
                        onClick={() => removeDetail(index)}
                        className="text-blue-400 hover:text-blue-500"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium">Tổng tiền</label>
          <input
            type="number"
            name="totalMoney"
            value={formData.totalMoney}
            readOnly
            className="mt-1 block w-full bg-[#1a2634] text-white rounded-md bg-gray-700 p-2"
          />
          {errors.totalMoney && <p className="text-red-400 text-sm mt-1">{errors.totalMoney}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Số tiền trả</label>
          <input
            type="number"
            name="paymentAmount"
            value={formData.paymentAmount}
            onChange={handleChange}
            className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 text-white"
          />
          {errors.paymentAmount && <p className="text-red-400 text-sm mt-1">{errors.paymentAmount}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Còn lại</label>
          <input
            type="number"
            name="remainAmount"
            value={formData.remainAmount}
            readOnly
            className="mt-1 block w-full bg-[#1a2634] text-white rounded-md bg-gray-700 p-2"
          />
        </div>
        <div className="flex space-x-4">
          <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
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