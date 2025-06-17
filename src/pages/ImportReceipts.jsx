// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getAllImportReceipts, addImportReceipt, getImportReceiptById } from '../services/receiptService';
// import ImportReceiptForm from '../components/receipt/ImportReceiptForm';
// import ImportList from '../components/receipt/ImportList';
// import ImportDetailForm from '../components/receipt/ImportDetailForm';
// import ReceiptDetails from '../components/receipt/ReceiptDetails';

// const ImportReceipts = () => {
//   const [receipts, setReceipts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [showDetailForm, setShowDetailForm] = useState(false);
//   const [selectedReceiptId, setSelectedReceiptId] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [receiptDetails, setReceiptDetails] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchReceipts = async () => {
//       try {
//         const response = await getAllImportReceipts(selectedDate);
//         setReceipts(response.data || []);
//       } catch (error) {
//         console.error('Error fetching receipts:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReceipts();
//   }, [selectedDate]);

//   const handleRefresh = async () => {
//     setLoading(true);
//     try {
//       const response = await getAllImportReceipts(selectedDate);
//       setReceipts(response.data || []);
//     } catch (error) {
//       console.error('Error refreshing receipts:', error);
//     } finally {
//       setLoading(false);
//       setShowForm(false);
//       setShowDetailForm(false);
//     }
//   };

//   const handleCancel = () => {
//     setShowForm(false);
//     setShowDetailForm(false);
//     setSelectedReceiptId(null);
//   };

//   const handleDelete = (receiptId) => {
//     console.log(`Xóa phiếu với ID: ${receiptId}`);
//   };

//   const handleShowDetailForm = async (receiptId) => {
//     try {
//       const response = await getImportReceiptById(receiptId);
//       setReceiptDetails(response.data);
//       setSelectedReceiptId(receiptId);
//       setShowDetailForm(true);
//     } catch (error) {
//       console.error('Error fetching receipt details:', error);
//     }
//   };

//   const handleShowReceiptDetails = (receiptId) => {
//     navigate(`/receipts/import/${receiptId}/details`);
//   };

//   if (loading) return <div className="p-6 text-white">Đang tải dữ liệu...</div>;

//   return (
//     <div className="p-6 bg-[#1a2634] rounded-lg min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-2xl font-semibold text-white">QUẢN LÝ PHIẾU NHẬP</h2>
//           <p className="text-sm text-gray-400">Quản lý danh sách phiếu nhập và thông tin chi tiết</p>
//         </div>
//         <div className="flex space-x-4">
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="border border-gray-600 p-2 bg-gray-800 text-white rounded-md"
//           />
//           <button onClick={() => setShowForm(true)} className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition">
//             + Thêm Phiếu Nhập Mới
//           </button>
//         </div>
//       </div>
//       {showForm && (
//         <ImportReceiptForm onCancel={handleCancel} onSuccess={handleRefresh} />
//       )}
//       {showDetailForm && selectedReceiptId && (
//         <div className="p-6 bg-[#2a3b4c] rounded-lg mt-6">
//           <h3 className="text-xl font-semibold text-white mb-4">Tạo Chi Tiết Phiếu Nhập</h3>
//           <ImportDetailForm receiptId={selectedReceiptId} receiptDetails={receiptDetails} onClose={() => setShowDetailForm(false)} />
//         </div>
//       )}
//       <ImportList receipts={receipts} onDelete={handleDelete} onShowDetailAdd={handleShowDetailForm} onShowDetailView={handleShowReceiptDetails} />
//     </div>
//   );
// };

// export default ImportReceipts;
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ImportReceiptForm from '../components/receipt/ImportReceiptForm';
import ImportList from '../components/receipt/ImportList';
import { ReceiptContext } from '../App';

const ImportReceipts = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const { receipts, updateReceipts } = useContext(ReceiptContext);
  const navigate = useNavigate();

  const handleAddReceipt = (newReceipt) => {
    const updatedReceipts = [
      ...receipts.import,
      { ...newReceipt, importReceiptID: receipts.import.length + 1 },
    ];
    updateReceipts({ import: updatedReceipts });
    setShowForm(false);
  };

  const handleDelete = (receiptId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phiếu nhập này?')) {
      const updatedReceipts = receipts.import.filter(r => r.importReceiptID !== receiptId);
      updateReceipts({ import: updatedReceipts });
    }
  };

  const handleShowReceiptDetails = (receiptId) => {
    navigate(`/receipts/import/${receiptId}/details`);
  };

  const filteredReceipts = receipts.import.filter(r => r.dateReceipt === selectedDate);

  return (
    <div className="p-6 bg-[#1a2634] rounded-lg min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">QUẢN LÝ PHIẾU NHẬP</h2>
          <p className="text-sm text-gray-400">Quản lý danh sách phiếu nhập và thông tin chi tiết</p>
        </div>
        <div className="flex space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-600 p-2 bg-gray-800 text-white rounded-md"
          />
          <button
            onClick={() => setShowForm(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
          >
            + Thêm Phiếu Nhập Mới
          </button>
        </div>
      </div>
      {showForm && <ImportReceiptForm onCancel={() => setShowForm(false)} onSuccess={handleAddReceipt} />}
      <ImportList
        receipts={filteredReceipts}
        onDelete={handleDelete}
        onShowDetailView={handleShowReceiptDetails}
      />
    </div>
  );
};

export default ImportReceipts;





// phần dưới dùng để fetch api
// import React, { useState, useEffect, useContext } from 'react';
// import { ReceiptContext } from '../App';
// import ImportReceiptForm from '../components/receipt/ImportReceiptForm';
// import ImportList from '../components/receipt/ImportList';
// import { getAllImportReceipts, getImportDetailByReceiptId } from '../services/receiptService';

// const ImportReceipts = () => {
//   const { receipts, updateReceipts } = useContext(ReceiptContext);
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

//   useEffect(() => {
//     const fetchReceipts = async () => {
//       try {
//         const result = await getAllImportReceipts(selectedDate);
//         const receiptsWithDetails = await Promise.all(
//           result.data.map(async (receipt) => {
//             const detailsResult = await getImportDetailByReceiptId(receipt.importReceiptID);
//             return {
//               ...receipt,
//               totalPrice: detailsResult.data.reduce((sum, d) => sum + d.intoMoney, receipt.intoMoney),
//               details: detailsResult.data.map((d, index) => ({
//                 ...d,
//                 stt: index + 1,
//               })),
//             };
//           })
//         );
//         updateReceipts({ import: receiptsWithDetails });
//       } catch (error) {
//         console.error('Lỗi khi fetch phiếu nhập:', error);
//         alert('Không thể tải danh sách phiếu nhập.');
//       }
//     };
//     fetchReceipts();
//   }, [selectedDate, updateReceipts]);

//   const handleAddReceipt = (newReceipt) => {
//     updateReceipts({ import: [...receipts.import, newReceipt] });
//   };

//   return (
//     <div className="p-6 bg-[#1a2634] rounded-lg min-h-screen">
//       <h2 className="text-2xl font-semibold text-white mb-6">QUẢN LÝ PHIẾU NHẬP</h2>
//       <div className="mb-6">
//         <label htmlFor="dateFilter" className="text-white mr-2">Lọc theo ngày:</label>
//         <input
//           type="date"
//           id="dateFilter"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//           className="border border-gray-600 p-2 bg-gray-800 text-white rounded-md"
//         />
//       </div>
//       <ImportReceiptForm onSuccess={handleAddReceipt} />
//       <ImportList receipts={receipts.import} />
//     </div>
//   );
// };

// export default ImportReceipts;