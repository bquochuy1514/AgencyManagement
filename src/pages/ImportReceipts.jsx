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
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ImportReceiptForm from '../components/receipt/ImportReceiptForm';
import ImportList from '../components/receipt/ImportList';
import ImportDetailForm from '../components/receipt/ImportDetailForm';
import { ReceiptContext } from '../App';

const ImportReceipts = () => {
  const [receipts, setReceipts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDetailForm, setShowDetailForm] = useState(false);
  const [selectedReceiptId, setSelectedReceiptId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const navigate = useNavigate();
  const { updateReceipts } = useContext(ReceiptContext);

  useEffect(() => {
    updateReceipts({ import: receipts });
  }, [receipts]);

  const handleAddReceipt = (newReceipt) => {
    const updatedReceipts = [
      ...receipts,
      { ...newReceipt, importReceiptID: receipts.length + 1, details: [] },
    ];
    setReceipts(updatedReceipts);
    setShowForm(false);
  };

  const handleAddDetail = (detail) => {
    const updatedReceipts = receipts.map(r =>
      r.importReceiptID === selectedReceiptId
        ? { ...r, details: [...(r.details || []), { ...detail, stt: (r.details.length || 0) + 1 }] }
        : r
    );
    setReceipts(updatedReceipts);
    setShowDetailForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setShowDetailForm(false);
    setSelectedReceiptId(null);
  };

  const handleDelete = (receiptId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phiếu nhập này?')) {
      setReceipts(receipts.filter(r => r.importReceiptID !== receiptId));
    }
  };

  const handleShowDetailForm = (receiptId) => {
    setSelectedReceiptId(receiptId);
    setShowDetailForm(true);
  };

  const handleShowReceiptDetails = (receiptId) => {
    navigate(`/receipts/import/${receiptId}/details`);
  };

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
      {showForm && <ImportReceiptForm onCancel={handleCancel} onSuccess={handleAddReceipt} />}
      {showDetailForm && selectedReceiptId && (
        <div className="p-6 bg-[#2a3b4c] rounded-lg mt-6">
          <h3 className="text-xl font-semibold text-white mb-4">Tạo Chi Tiết Phiếu Nhập</h3>
          <ImportDetailForm
            receiptId={selectedReceiptId}
            receipt={receipts.find(r => r.importReceiptID === selectedReceiptId)}
            onClose={handleCancel}
            onAddDetail={handleAddDetail}
          />
        </div>
      )}
      <ImportList
        receipts={receipts}
        onDelete={handleDelete}
        onShowDetailAdd={handleShowDetailForm}
        onShowDetailView={handleShowReceiptDetails}
      />
    </div>
  );
};

export default ImportReceipts;