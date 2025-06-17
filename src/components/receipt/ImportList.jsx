// import React, { useState } from 'react';

// const ImportList = ({ receipts, onDelete, onShowDetailAdd, onShowDetailView }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = receipts.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(receipts.length / itemsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full divide-y divide-gray-700">
//         <thead className="bg-[#2a3b4c] text-gray-300">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Số phiếu</th>
//             <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ngày lập</th>
//             <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Tổng tiền</th>
//             <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Hành động</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-700 text-gray-200">
//           {currentItems.map((receipt) => (
//             <tr key={receipt.importReceiptID} className="border-t border-gray-700">
//               <td className="px-4 py-3">{receipt.importReceiptID}</td>
//               <td className="px-4 py-3">{new Date(receipt.dateReceipt).toLocaleDateString()}</td>
//               <td className="px-4 py-3">{new Intl.NumberFormat('vi-VN').format(receipt.totalMoney)} đ</td>
//               <td className="px-4 py-3 flex space-x-2">
//                 <button
//                   onClick={() => onShowDetailAdd(receipt.importReceiptID)}
//                   className="text-blue-400 hover:text-blue-500"
//                 >
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                     />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={() => onShowDetailView(receipt.importReceiptID)}
//                   className="text-green-400 hover:text-green-500"
//                 >
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                     />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={() => onDelete(receipt.importReceiptID)}
//                   className="text-red-400 hover:text-red-500"
//                 >
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M3 7h18"
//                     />
//                   </svg>
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {receipts.length > itemsPerPage && (
//         <div className="flex justify-center items-center mt-4 space-x-2">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className={`px-4 py-2 rounded-md text-sm ${
//               currentPage === 1
//                 ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
//                 : 'bg-blue-600 text-white hover:bg-blue-700'
//             }`}
//           >
//             Trang trước
//           </button>
//           <span className="text-gray-400 text-sm">
//             Trang {currentPage} / {totalPages}
//           </span>
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className={`px-4 py-2 rounded-md text-sm ${
//               currentPage === totalPages
//                 ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
//                 : 'bg-blue-600 text-white hover:bg-blue-700'
//             }`}
//           >
//             Trang sau
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImportList;


import React from 'react';
import { FaPlus, FaEye, FaTrash } from 'react-icons/fa';

const ImportList = ({ receipts, onDelete, onShowDetailAdd, onShowDetailView }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Số phiếu</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ngày lập</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tổng tiền</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Hành động</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {receipts.map((receipt) => (
            <tr key={receipt.importReceiptID} className="hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{receipt.importReceiptID}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                {new Date(receipt.dateReceipt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                {new Intl.NumberFormat('vi-VN').format(receipt.totalMoney || 0)} đ
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onShowDetailAdd(receipt.importReceiptID)}
                    className="text-blue-400 hover:text-blue-300 p-1"
                    title="Thêm chi tiết"
                  >
                    <FaPlus />
                  </button>
                  <button
                    onClick={() => onShowDetailView(receipt.importReceiptID)}
                    className="text-green-400 hover:text-green-300 p-1"
                    title="Xem chi tiết"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => onDelete(receipt.importReceiptID)}
                    className="text-red-400 hover:text-red-300 p-1"
                    title="Xóa phiếu"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ImportList;