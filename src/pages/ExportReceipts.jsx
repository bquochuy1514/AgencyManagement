import React, { useState, useEffect } from 'react';
   import { getAllExportReceipts } from '../services/receiptService';
   import ExportReceiptForm from '../components/receipt/ExportReceiptForm';
   import ReceiptDetails from '../components/receipt/ReceiptDetails';

   const ExportReceipts = () => {
     const [receipts, setReceipts] = useState([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
       const fetchReceipts = async () => {
         try {
           const response = await getAllExportReceipts();
           setReceipts(response.data || []);
         } catch (error) {
           console.error('Error fetching receipts:', error);
         } finally {
           setLoading(false);
         }
       };
       fetchReceipts();
     }, []);

     if (loading) {
       return <div className="p-6 text-white">Đang tải dữ liệu...</div>;
     }

     return (
       <div className="p-6">
         <h1 className="text-2xl font-bold mb-4">Danh sách Phiếu Xuất</h1>
         <div className="space-y-6">
           <ExportReceiptForm />
           <div className="overflow-x-auto">
             <table className="min-w-full divide-y divide-gray-700">
               <thead className="bg-gray-800 text-gray-300">
                 <tr>
                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Mã phiếu</th>
                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ngày lập</th>
                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Tổng tiền</th>
                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Hành động</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-700 text-gray-200">
                 {receipts.map((receipt) => (
                   <tr key={receipt.exportReceiptID} className="border-t border-gray-700">
                     <td className="px-4 py-3">{receipt.exportReceiptID}</td>
                     <td className="px-4 py-3">{new Date(receipt.dateReceipt).toLocaleDateString()}</td>
                     <td className="px-4 py-3">
                       {new Intl.NumberFormat('vi-VN').format(receipt.totalMoney)} đ
                     </td>
                     <td className="px-4 py-3">
                       <a href={`/details/receipt/${receipt.exportReceiptID}`} className="text-blue-400 hover:text-blue-500">
                         Xem chi tiết
                       </a>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
           <ReceiptDetails />
         </div>
       </div>
     );
   };

   export default ExportReceipts;