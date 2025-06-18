// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ExportReceiptForm from '../components/receipt/ExportReceiptForm';
// import ExportList from '../components/receipt/ExportList';
// import ExportDetailForm from '../components/receipt/ExportDetailForm';
// import { ReceiptContext } from '../App';
// import { getAllExportReceipts, getExportDetailByReceiptId } from '../services/receiptService';
// import { toast } from 'react-toastify';

// const ExportReceipts = () => {
//   const [receipts, setReceipts] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [showDetailForm, setShowDetailForm] = useState(false);
//   const [selectedReceiptId, setSelectedReceiptId] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const navigate = useNavigate();
//   const { updateReceipts } = useContext(ReceiptContext);

//   useEffect(() => {
//     const fetchReceipts = async () => {
//       try {
//         const response = await getAllExportReceipts(selectedDate);
//         const receiptsWithDetails = await Promise.all(
//           response.data.map(async (receipt) => {
//             const detailsResponse = await getExportDetailByReceiptId(receipt.exportReceiptID);
//             return { ...receipt, details: detailsResponse.data };
//           })
//         );
//         setReceipts(receiptsWithDetails);
//         updateReceipts({ export: receiptsWithDetails });
//       } catch (err) {
//         toast.error('Lỗi khi tải danh sách phiếu xuất!');
//       }
//     };
//     fetchReceipts();
//   }, [selectedDate, updateReceipts]);

//   const handleAddReceipt = () => {
//     setShowForm(false);
//     const fetchReceipts = async () => {
//       try {
//         const response = await getAllExportReceipts(selectedDate);
//         const receiptsWithDetails = await Promise.all(
//           response.data.map(async (receipt) => {
//             const detailsResponse = await getExportDetailByReceiptId(receipt.exportReceiptID);
//             return { ...receipt, details: detailsResponse.data };
//           })
//         );
//         setReceipts(receiptsWithDetails);
//         updateReceipts({ export: receiptsWithDetails });
//       } catch (err) {
//         toast.error('Lỗi khi tải danh sách phiếu xuất!');
//       }
//     };
//     fetchReceipts();
//   };

//   const handleAddDetail = () => {
//     setShowDetailForm(false);
//     const fetchReceipts = async () => {
//       try {
//         const response = await getAllExportReceipts(selectedDate);
//         const receiptsWithDetails = await Promise.all(
//           response.data.map(async (receipt) => {
//             const detailsResponse = await getExportDetailByReceiptId(receipt.exportReceiptID);
//             return { ...receipt, details: detailsResponse.data };
//           })
//         );
//         setReceipts(receiptsWithDetails);
//         updateReceipts({ export: receiptsWithDetails });
//       } catch (err) {
//         toast.error('Lỗi khi tải danh sách phiếu xuất!');
//       }
//     };
//     fetchReceipts();
//   };

//   const handleCancel = () => {
//     setShowForm(false);
//     setShowDetailForm(false);
//     setSelectedReceiptId(null);
//   };

//   const handleDelete = (receiptId) => {
//     if (window.confirm('Bạn có chắc chắn muốn xóa phiếu xuất này?')) {
//       setReceipts(receipts.filter(r => r.exportReceiptID !== receiptId));
//       toast.success('Xóa phiếu xuất thành công! (Chức năng mô phỏng)');
//     }
//   };

//   const handleShowDetailForm = (receiptId) => {
//     setSelectedReceiptId(receiptId);
//     setShowDetailForm(true);
//   };

//   const handleShowReceiptDetails = (receiptId) => {
//     navigate(`/receipts/export/${receiptId}/details`);
//   };

//   return (
//     <div className="p-6 bg-[#1a2634] rounded-lg min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-2xl font-semibold text-white">QUẢN LÝ PHIẾU XUẤT</h2>
//           <p className="text-sm text-gray-400">Quản lý danh sách phiếu xuất và thông tin chi tiết</p>
//         </div>
//         <div className="flex space-x-4">
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="border border-gray-600 p-2 bg-gray-800 text-white rounded-md"
//           />
//           <button
//             onClick={() => setShowForm(true)}
//             className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
//           >
//             + Thêm Phiếu Xuất Mới
//           </button>
//         </div>
//       </div>
//       {showForm && <ExportReceiptForm onCancel={handleCancel} onSuccess={handleAddReceipt} />}
//       {showDetailForm && selectedReceiptId && (
//         <div className="p-6 bg-[#2a3b4c] rounded-lg mt-6">
//           <h3 className="text-xl font-semibold text-white mb-4">Tạo Chi Tiết Phiếu Xuất</h3>
//           <ExportDetailForm
//             receiptId={selectedReceiptId}
//             receipt={receipts.find(r => r.exportReceiptID === selectedReceiptId)}
//             onClose={handleCancel}
//             onAddDetail={handleAddDetail}
//           />
//         </div>
//       )}
//       <ExportList
//         receipts={receipts}
//         onDelete={handleDelete}
//         onShowDetailAdd={handleShowDetailForm}
//         onShowDetailView={handleShowReceiptDetails}
//       />
//     </div>
//   );
// };

// export default ExportReceipts;


import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ExportReceiptForm from '../components/receipt/ExportReceiptForm';
import ExportList from '../components/receipt/ExportList';
import ExportDetailForm from '../components/receipt/ExportDetailForm';
import { ReceiptContext } from '../App';
import { getAllExportReceipts, deleteExportReceipt } from '../services/receiptService';
import { toast } from 'react-toastify';

const ExportReceipts = () => {
  const [receipts, setReceipts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDetailForm, setShowDetailForm] = useState(false);
  const [selectedReceiptId, setSelectedReceiptId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const navigate = useNavigate();
  const { updateReceipts } = useContext(ReceiptContext);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await getAllExportReceipts(selectedDate);
        setReceipts(response.data);
        updateReceipts({ export: response.data });
      } catch (err) {
        toast.error('Lỗi khi tải danh sách phiếu xuất!');
      }
    };
    fetchReceipts();
  }, [selectedDate, updateReceipts]);

  const handleAddReceipt = () => {
    setShowForm(false);
    const fetchReceipts = async () => {
      try {
        const response = await getAllExportReceipts(selectedDate);
        setReceipts(response.data);
        updateReceipts({ export: response.data });
      } catch (err) {
        toast.error('Lỗi khi tải danh sách phiếu xuất!');
      }
    };
    fetchReceipts();
  };

  const handleAddDetail = () => {
    setShowDetailForm(false);
    const fetchReceipts = async () => {
      try {
        const response = await getAllExportReceipts(selectedDate);
        setReceipts(response.data);
        updateReceipts({ export: response.data });
      } catch (err) {
        toast.error('Lỗi khi tải danh sách phiếu xuất!');
      }
    };
    fetchReceipts();
  };

  const handleCancel = () => {
    setShowForm(false);
    setShowDetailForm(false);
    setSelectedReceiptId(null);
  };

  const handleDelete = async (receiptId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phiếu xuất này?')) {
      try {
        await deleteExportReceipt(receiptId);
        setReceipts(receipts.filter(r => r.exportReceiptID !== receiptId));
        updateReceipts({ export: receipts.filter(r => r.exportReceiptID !== receiptId) });
        toast.success('Xóa phiếu xuất thành công!');
      } catch (err) {
        toast.error('Lỗi khi xóa phiếu xuất!');
      }
    }
  };

  const handleShowDetailForm = (receiptId) => {
    setSelectedReceiptId(receiptId);
    setShowDetailForm(true);
  };

  const handleShowReceiptDetails = (receiptId) => {
    navigate(`/receipts/export/${receiptId}/details`);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-yellow-400">QUẢN LÝ PHIẾU XUẤT</h2>
          <p className="text-sm text-gray-400">Quản lý danh sách phiếu xuất và thông tin chi tiết</p>
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
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            + Thêm Phiếu Xuất Mới
          </button>
        </div>
      </div>
      {showForm && <ExportReceiptForm onCancel={handleCancel} onSuccess={handleAddReceipt} />}
      {showDetailForm && selectedReceiptId && (
        <ExportDetailForm
          receiptId={selectedReceiptId}
          receipt={receipts.find(r => r.exportReceiptID === selectedReceiptId)}
          onClose={handleCancel}
          onAddDetail={handleAddDetail}
        />
      )}
      <ExportList
        receipts={receipts}
        onDelete={handleDelete}
        onShowDetailAdd={handleShowDetailForm}
        onShowDetailView={handleShowReceiptDetails}
      />
    </div>
  );
};

export default ExportReceipts;