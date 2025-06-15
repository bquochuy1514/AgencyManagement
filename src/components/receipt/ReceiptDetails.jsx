
// import React, { useContext, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ReceiptContext } from '../../App';

// const ReceiptDetails = () => {
//   const { receiptId, type } = useParams();
//   const navigate = useNavigate();
//   const { receipts } = useContext(ReceiptContext);

//   useEffect(() => {
//     if (!receipts || !receipts[type] || !receipts[type].find(r => (type === 'import' ? r.importReceiptID : r.exportReceiptID) === parseInt(receiptId))) {
//       console.log(`Không tìm thấy phiếu ${type} với ID ${receiptId}. Dữ liệu receipts:`, receipts);
//     }
//   }, [receipts, receiptId, type]);

//   const receipt = type === 'import'
//     ? receipts[type]?.find(r => r.importReceiptID === parseInt(receiptId))
//     : receipts[type]?.find(r => r.exportReceiptID === parseInt(receiptId));
//   const totalMoney = receipt?.details.reduce((sum, item) => sum + item.intoMoney, 0) || 0;

//   const handleExport = () => {
//     alert(`Xuất file ${type === 'import' ? 'Phiếu Nhập' : 'Phiếu Xuất'} ID ${receiptId} thành công! (Chức năng mô phỏng)`);
//   };

//   if (!receipt) return <div className="p-6 text-red-300">Không tìm thấy phiếu. Vui lòng kiểm tra lại ID hoặc thêm phiếu mới.</div>;

//   return (
//     <div className="p-6 bg-gray-800 text-white min-h-screen">
//       <h2 className="text-2xl font-bold mb-4 text-blue-400">
//         Chi tiết phiếu {type === 'import' ? 'nhập' : 'xuất'}
//       </h2>
//       <div className="bg-gray-700 p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
//         <div className="bg-gray-800 p-4 rounded-t-lg border-b border-gray-700">
//           <div className="flex justify-between text-gray-300">
//             <div>
//               <label className="block">Số phiếu:</label>
//               <input
//                 type="text"
//                 value={type === 'import' ? receipt.importReceiptID : receipt.exportReceiptID}
//                 readOnly
//                 className="bg-gray-800 text-white ml-2 w-32 border-none focus:outline-none"
//               />
//             </div>
//             <div>
//               <label className="block">Ngày lập phiếu:</label>
//               <input
//                 type="text"
//                 value={new Date(receipt.dateReceipt).toLocaleDateString()}
//                 readOnly
//                 className="bg-gray-800 text-white ml-2 w-32 border-none focus:outline-none"
//               />
//             </div>
//           </div>
//           {type === 'export' && (
//             <div className="flex justify-between text-gray-300 mt-2">
//               <div>
//                 <label className="block">Đại lý:</label>
//                 <input
//                   type="text"
//                   value={receipt.agentID || 'Chưa có'}
//                   readOnly
//                   className="bg-gray-800 text-white ml-2 w-32 border-none focus:outline-none"
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="overflow-x-auto mt-4">
//           <table className="min-w-full divide-y divide-gray-700">
//             <thead className="bg-gray-600 text-gray-300">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">STT</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Mặt Hàng</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Đơn Vị Tính</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Số Lượng</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Đơn Giá</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Thành Tiền</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-700 text-gray-200">
//               {receipt.details.map((item) => (
//                 <tr key={item.stt} className="border-t border-gray-700">
//                   <td className="px-4 py-3">{item.stt}</td>
//                   <td className="px-4 py-3">{item.productName}</td>
//                   <td className="px-4 py-3">{item.unitName}</td>
//                   <td className="px-4 py-3">{type === 'import' ? item.quantityImport : item.quantityExport}</td>
//                   <td className="px-4 py-3">
//                     {new Intl.NumberFormat('vi-VN').format(type === 'import' ? item.importPrice : item.exportPrice)} đ
//                   </td>
//                   <td className="px-4 py-3">
//                     {new Intl.NumberFormat('vi-VN').format(item.intoMoney)} đ
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="bg-gray-800 p-4 rounded-b-lg border-t border-gray-700 mt-4">
//           <div className="flex justify-between text-gray-300">
//             <div>
//               <label className="block">Tổng tiền:</label>
//               <input
//                 type="text"
//                 value={new Intl.NumberFormat('vi-VN').format(totalMoney) + ' đ'}
//                 readOnly
//                 className="bg-gray-800 text-white ml-2 w-32 border-none focus:outline-none"
//               />
//             </div>
//             {type === 'export' && (
//               <>
//                 <div>
//                   <label className="block">Số tiền trả:</label>
//                   <input
//                     type="text"
//                     value={new Intl.NumberFormat('vi-VN').format(receipt.paymentAmount) + ' đ'}
//                     readOnly
//                     className="bg-gray-800 text-white ml-2 w-32 border-none focus:outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block">Còn lại:</label>
//                   <input
//                     type="text"
//                     value={new Intl.NumberFormat('vi-VN').format(receipt.remainAmount) + ' đ'}
//                     readOnly
//                     className="bg-gray-800 text-white ml-2 w-32 border-none focus:outline-none"
//                   />
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//         <div className="flex justify-end mt-4 space-x-4">
//           <button
//             onClick={() => navigate(-1)}
//             className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
//           >
//             Quay lại
//           </button>
//           <button
//             onClick={handleExport}
//             className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
//           >
//             Xuất file (PDF/XLSX)
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReceiptDetails;
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReceiptContext } from '../../App';

const ReceiptDetails = () => {
  const { receiptId, type } = useParams();
  const navigate = useNavigate();
  const { receipts } = useContext(ReceiptContext);

  const receipt = type === 'import'
    ? receipts.import?.find(r => r.importReceiptID === parseInt(receiptId))
    : null;
  const totalMoney = receipt?.details.reduce((sum, item) => sum + item.intoMoney, 0) || 0;

  const handleExport = () => {
    alert(`Xuất file Phiếu Nhập ID ${receiptId} thành công! (Chức năng mô phỏng)`);
  };

  if (!receipt) return <div className="p-6 text-red-300">Không tìm thấy phiếu. Vui lòng kiểm tra lại ID hoặc thêm phiếu mới.</div>;

  return (
    <div className="p-6 bg-gray-800 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-blue-400">Chi tiết phiếu nhập</h2>
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        <div className="bg-gray-800 p-4 rounded-t-lg border-b border-gray-700">
          <div className="flex justify-between text-gray-300">
            <div>
              <label className="block">Số phiếu:</label>
              <input
                type="text"
                value={receipt.importReceiptID}
                readOnly
                className="bg-gray-800 text-white ml-2 w-32 border-none focus:outline-none"
              />
            </div>
            <div>
              <label className="block">Ngày lập phiếu:</label>
              <input
                type="text"
                value={new Date(receipt.dateReceipt).toLocaleDateString()}
                readOnly
                className="bg-gray-800 text-white ml-2 w-32 border-none focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-600 text-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">STT</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Mặt Hàng</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Đơn Vị Tính</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Số Lượng</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Đơn Giá</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Thành Tiền</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 text-gray-200">
              {receipt.details.map((item) => (
                <tr key={item.stt} className="border-t border-gray-700">
                  <td className="px-4 py-3">{item.stt}</td>
                  <td className="px-4 py-3">{item.productName}</td>
                  <td className="px-4 py-3">{item.unitName}</td>
                  <td className="px-4 py-3">{item.quantityImport}</td>
                  <td className="px-4 py-3">
                    {new Intl.NumberFormat('vi-VN').format(item.importPrice)} đ
                  </td>
                  <td className="px-4 py-3">
                    {new Intl.NumberFormat('vi-VN').format(item.intoMoney)} đ
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-800 p-4 rounded-b-lg border-t border-gray-700 mt-4">
          <div className="flex justify-between text-gray-300">
            <div>
              <label className="block">Tổng tiền:</label>
              <input
                type="text"
                value={new Intl.NumberFormat('vi-VN').format(totalMoney) + ' đ'}
                readOnly
                className="bg-gray-800 text-white ml-2 w-32 border-none focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4 space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
          >
            Quay lại
          </button>
          <button
            onClick={handleExport}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Xuất file (PDF/XLSX)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptDetails;
