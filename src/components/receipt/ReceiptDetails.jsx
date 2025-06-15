// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getImportReceiptById, getExportReceiptById, getImportDetailByReceiptId, getExportDetailByReceiptId } from '../../services/receiptService';

// const ReceiptDetails = () => {
//   const { receiptId, type } = useParams();
//   const [details, setDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         setError(null);
//         let response;
//         if (type === 'import') {
//           response = await getImportReceiptById(receiptId);
//           const detailsResponse = await getImportDetailByReceiptId(receiptId);
//           setDetails({ ...response.data, details: detailsResponse.data });
//         } else if (type === 'export') {
//           response = await getExportReceiptById(receiptId);
//           const detailsResponse = await getExportDetailByReceiptId(receiptId);
//           setDetails({ ...response.data, details: detailsResponse.data });
//         }
//       } catch (err) {
//         setError('Không thể tải chi tiết phiếu. Vui lòng thử lại.');
//         console.error('Lỗi fetchDetails:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDetails();
//   }, [receiptId, type]);

//   if (loading) return <div className="p-6 text-white">Đang tải dữ liệu...</div>;
//   if (error || !details) return <div className="p-6 text-red-300">{error || 'Không tìm thấy dữ liệu.'}</div>;

//   return (
//     <div className="p-6 bg-gray-900 rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4">
//         {type === 'import' ? 'Chi Tiết Phiếu Nhập' : 'Chi Tiết Phiếu Xuất'} (Mã: {receiptId})
//       </h2>
//       <div className="space-y-4">
//         <div>
//           <h3 className="text-lg font-medium text-gray-300">Thông tin phiếu</h3>
//           <p><strong>Ngày lập:</strong> {new Date(details.dateReceipt).toLocaleDateString()}</p>
//           {type === 'import' ? (
//             <p><strong>Tổng giá:</strong> {new Intl.NumberFormat('vi-VN').format(details.totalPrice)} đ</p>
//           ) : (
//             <>
//               <p><strong>Tổng tiền:</strong> {new Intl.NumberFormat('vi-VN').format(details.totalMoney)} đ</p>
//               <p><strong>Số tiền thanh toán:</strong> {new Intl.NumberFormat('vi-VN').format(details.paymentAmount)} đ</p>
//               <p><strong>Số tiền còn lại:</strong> {new Intl.NumberFormat('vi-VN').format(details.remainAmount)} đ</p>
//               <p><strong>Đại lý:</strong> {details.agentID?.agentName || 'Chưa có'}</p>
//             </>
//           )}
//         </div>
//         <div>
//           <h3 className="text-lg font-medium text-gray-300">Chi tiết sản phẩm</h3>
//           {details.details && details.details.length > 0 ? (
//             <table className="min-w-full divide-y divide-gray-700 mt-2">
//               <thead className="bg-gray-800 text-gray-300">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Sản phẩm</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Số lượng</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Giá</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Thành tiền</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-700 text-gray-200">
//                 {details.details.map((item, index) => (
//                   <tr key={index} className="border-t border-gray-700">
//                     <td className="px-4 py-3">{item.productID?.productName || 'Chưa có'}</td>
//                     <td className="px-4 py-3">
//                       {type === 'import' ? item.quantityImport : item.quantityExport}
//                     </td>
//                     <td className="px-4 py-3">
//                       {new Intl.NumberFormat('vi-VN').format(type === 'import' ? item.importPrice : item.exportPrice)} đ
//                     </td>
//                     <td className="px-4 py-3">
//                       {new Intl.NumberFormat('vi-VN').format(item.intoMoney)} đ
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p className="text-gray-400">Không có chi tiết nào.</p>
//           )}
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





// phần này dùng để fetchapi 
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getImportReceiptById, getImportDetailByReceiptId } from '../../services/receiptService';

// const ReceiptDetails = () => {
//   const { type, receiptId } = useParams();
//   const [receipt, setReceipt] = useState(null);
//   const [details, setDetails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchReceiptDetails = async () => {
//       if (type !== 'import') {
//         setError('Loại phiếu không hợp lệ.');
//         setLoading(false);
//         return;
//       }

//       try {
//         const receiptResult = await getImportReceiptById(receiptId);
//         const detailsResult = await getImportDetailByReceiptId(receiptId);
//         setReceipt({
//           ...receiptResult.data,
//           totalPrice: detailsResult.data.reduce((sum, d) => sum + d.intoMoney, receiptResult.data.intoMoney),
//           details: detailsResult.data.map((d, index) => ({
//             ...d,
//             stt: index + 1,
//           })),
//         });
//         setDetails(detailsResult.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Lỗi khi fetch chi tiết phiếu nhập:', error);
//         setError('Không thể tải chi tiết phiếu nhập.');
//         setLoading(false);
//       }
//     };
//     fetchReceiptDetails();
//   }, [receiptId, type]);

//   if (loading) {
//     return <div className="text-white text-center py-12">Đang tải...</div>;
//   }

//   if (error) {
//     return <div className="text-red-400 text-center py-12">{error}</div>;
//   }

//   if (!receipt) {
//     return <div className="text-white text-center py-12">Không tìm thấy phiếu nhập.</div>;
//   }

//   return (
//     <div className="p-6 bg-[#1a2634] rounded-lg min-h-screen">
//       <h2 className="text-2xl font-semibold text-white mb-6">CHI TIẾT PHIẾU NHẬP</h2>
//       <div className="bg-[#2c3e50] p-6 rounded-lg shadow-lg mb-6">
//         <p className="text-white mb-2"><strong>Mã phiếu nhập:</strong> {receipt.importReceiptID}</p>
//         <p className="text-white mb-2"><strong>Ngày nhập:</strong> {receipt.dateReceipt}</p>
//         <p className="text-white mb-2"><strong>Tổng tiền:</strong> {receipt.totalPrice.toLocaleString()} VNĐ</p>
//       </div>
//       <h3 className="text-xl font-semibold text-white mb-4">Danh sách mặt hàng</h3>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-[#2c3e50] rounded-lg">
//           <thead>
//             <tr>
//               <th className="px-6 py-3 text-left text-white font-semibold">STT</th>
//               <th className="px-6 py-3 text-left text-white font-semibold">Mã sản phẩm</th>
//               <th className="px-6 py-3 text-left text-white font-semibold">Tên sản phẩm</th>
//               <th className="px-6 py-3 text-left text-white font-semibold">Đơn vị</th>
//               <th className="px-6 py-3 text-left text-white font-semibold">Số lượng</th>
//               <th className="px-6 py-3 text-left text-white font-semibold">Giá nhập</th>
//               <th className="px-6 py-3 text-left text-white font-semibold">Thành tiền</th>
//             </tr>
//           </thead>
//           <tbody>
//             {details.map((detail) => (
//               <tr key={detail.stt} className="border-t border-gray-600">
//                 <td className="px-6 py-4 text-white">{detail.stt}</td>
//                 <td className="px-6 py-4 text-white">{detail.productID}</td>
//                 <td className="px-6 py-4 text-white">{detail.productName}</td>
//                 <td className="px-6 py-4 text-white">{detail.unitName}</td>
//                 <td className="px-6 py-4 text-white">{detail.quantityImport}</td>
//                 <td className="px-6 py-4 text-white">{detail.importPrice.toLocaleString()} VNĐ</td>
//                 <td className="px-6 py-4 text-white">{detail.intoMoney.toLocaleString()} VNĐ</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ReceiptDetails;