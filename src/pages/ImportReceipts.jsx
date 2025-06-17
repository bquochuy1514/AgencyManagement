// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ImportReceiptForm from '../components/receipt/ImportReceiptForm';
// import ImportList from '../components/receipt/ImportList';
// import ImportDetailForm from '../components/receipt/ImportDetailForm';
// import { ReceiptContext } from '../App';

// const ImportReceipts = () => {
//   const [receipts, setReceipts] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [showDetailForm, setShowDetailForm] = useState(false);
//   const [selectedReceiptId, setSelectedReceiptId] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const navigate = useNavigate();
//   const { updateReceipts } = useContext(ReceiptContext);

//   useEffect(() => {
//     updateReceipts({ import: receipts });
//   }, [receipts]);

//   const handleAddReceipt = (newReceipt) => {
//     const updatedReceipts = [
//       ...receipts,
//       { ...newReceipt, importReceiptID: receipts.length + 1, details: [] },
//     ];
//     setReceipts(updatedReceipts);
//     setShowForm(false);
//   };

//   const handleAddDetail = (detail) => {
//     const updatedReceipts = receipts.map(r =>
//       r.importReceiptID === selectedReceiptId
//         ? { ...r, details: [...(r.details || []), { ...detail, stt: (r.details.length || 0) + 1 }] }
//         : r
//     );
//     setReceipts(updatedReceipts);
//     setShowDetailForm(false);
//   };

//   const handleCancel = () => {
//     setShowForm(false);
//     setShowDetailForm(false);
//     setSelectedReceiptId(null);
//   };

//   const handleDelete = (receiptId) => {
//     if (window.confirm('Bạn có chắc chắn muốn xóa phiếu nhập này?')) {
//       setReceipts(receipts.filter(r => r.importReceiptID !== receiptId));
//     }
//   };

//   const handleShowDetailForm = (receiptId) => {
//     setSelectedReceiptId(receiptId);
//     setShowDetailForm(true);
//   };

//   const handleShowReceiptDetails = (receiptId) => {
//     navigate(`/receipts/import/${receiptId}/details`);
//   };

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
//           <button
//             onClick={() => setShowForm(true)}
//             className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
//           >
//             + Thêm Phiếu Nhập Mới
//           </button>
//         </div>
//       </div>
//       {showForm && <ImportReceiptForm onCancel={handleCancel} onSuccess={handleAddReceipt} />}
//       {showDetailForm && selectedReceiptId && (
//         <div className="p-6 bg-[#2a3b4c] rounded-lg mt-6">
//           <h3 className="text-xl font-semibold text-white mb-4">Tạo Chi Tiết Phiếu Nhập</h3>
//           <ImportDetailForm
//             receiptId={selectedReceiptId}
//             receipt={receipts.find(r => r.importReceiptID === selectedReceiptId)}
//             onClose={handleCancel}
//             onAddDetail={handleAddDetail}
//           />
//         </div>
//       )}
//       <ImportList
//         receipts={receipts}
//         onDelete={handleDelete}
//         onShowDetailAdd={handleShowDetailForm}
//         onShowDetailView={handleShowReceiptDetails}
//       />
//     </div>
//   );
// };

// export default ImportReceipts;

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ImportReceiptForm from '../components/receipt/ImportReceiptForm';
import ImportList from '../components/receipt/ImportList';
import ImportDetailForm from '../components/receipt/ImportDetailForm';
import DeleteImportReceiptPopup from '../components/receipt/DeleteImportReceiptPopup';
import { ReceiptContext } from '../App';
import { FaPlus, FaCalendar } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ImportReceipts = () => {
  const [receipts, setReceipts] = useState([]);
  const [showAddReceiptPopup, setShowAddReceiptPopup] = useState(false);
  const [showDetailForm, setShowDetailForm] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedReceiptId, setSelectedReceiptId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updateReceipts } = useContext(ReceiptContext);

  const fetchReceipts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/importReceipt/getAllImportReceipts')
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      if (data.code === 200) {
        setReceipts(data.data || []);
        updateReceipts({ import: data.data || [] });
      }
    } catch (error) {
      toast.error('Lỗi khi tải dữ liệu phiếu nhập');
      console.error('Lỗi khi gọi API:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

  const handleAddReceipt = async (newReceipt) => {
    try {
      const response = await fetch('http://localhost:3001/importReceipt/addImportReceipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReceipt),
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      if (data.code === 201) {
        toast.success('Thêm phiếu nhập thành công');
        setReceipts(prev => [...prev, data.data]);
      } else {
        throw new Error(data.message || 'Lỗi khi thêm phiếu nhập');
      }
    } catch (error) {
      toast.error(error.message);
      console.error('Lỗi:', error);
    }
    setShowAddReceiptPopup(false);
  };

  const handleAddDetail = async (detail) => {
    try {
      const response = await fetch('http://localhost:3001/importDetail/addImportDetail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          importReceiptID: selectedReceiptId,
          productID: detail.productID,
          unitID: detail.unitID,
          quantityImport: detail.quantityImport,
          importPrice: detail.importPrice
        }),
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      if (data.code === 201) {
        toast.success('Thêm chi tiết thành công');
        setReceipts(prev => prev.map(receipt => {
          if (receipt.importReceiptID === selectedReceiptId) {
            const newDetail = {
              ...data.data,
              stt: receipt.details.length + 1
            };
            return {
              ...receipt,
              details: [...receipt.details, newDetail],
              totalMoney: receipt.totalMoney + newDetail.intoMoney
            };
          }
          return receipt;
        }));
      } else {
        throw new Error(data.message || 'Lỗi khi thêm chi tiết');
      }
    } catch (error) {
      toast.error(error.message);
      console.error('Lỗi:', error);
    }
    setShowDetailForm(false);
  };

  const handleDelete = async (receiptId) => {
    try {
      const response = await fetch(`http://localhost:3001/import-receipts/${receiptId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      if (data.code === 200) {
        toast.success('Xóa phiếu nhập thành công');
        setReceipts(prev => prev.filter(r => r.importReceiptID !== receiptId));
      } else {
        throw new Error(data.message || 'Lỗi khi xóa phiếu nhập');
      }
    } catch (error) {
      toast.error(error.message);
      console.error('Lỗi:', error);
    }
    setShowDeletePopup(false);
  };

  const handleShowDetailForm = (receiptId) => {
    setSelectedReceiptId(receiptId);
    setShowDetailForm(true);
  };

  const handleViewReceipt = (receiptId) => {
    navigate(`/receipts/import/${receiptId}/details`);
  };

  const getReceiptsByDate = async (date) => {
    try {
      const response = await fetch(`http://localhost:3001/importReceiptbyImportDate?dateReceipt=${date}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      return data.code === 200 ? data.data : [];
    } catch (error) {
      console.error('Lỗi khi lọc theo ngày:', error);
      return [];
    }
  };

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    const filteredReceipts = await getReceiptsByDate(date);
    setReceipts(filteredReceipts);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-red-500">QUẢN LÝ PHIẾU NHẬP</h1>
        <p className="text-gray-400 mt-2">Quản lý danh sách phiếu nhập và thông tin chi tiết</p>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-1/3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full p-2 pl-10 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button
          onClick={() => setShowAddReceiptPopup(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center"
        >
          <FaPlus className="mr-2" /> Thêm Phiếu Nhập Mới
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <>
          {showAddReceiptPopup && (
            <ImportReceiptForm 
              onClose={() => setShowAddReceiptPopup(false)} 
              onSuccess={handleAddReceipt} 
            />
          )}
          
          {showDetailForm && (
            <ImportDetailForm
              receiptId={selectedReceiptId}
              onClose={() => setShowDetailForm(false)}
              onAddDetail={handleAddDetail}
            />
          )}
          
          {showDeletePopup && (
            <DeleteImportReceiptPopup
              receiptId={selectedReceiptId}
              onClose={() => setShowDeletePopup(false)}
              onDeleted={handleDelete}
            />
          )}
          
          <ImportList
            receipts={receipts}
            onDelete={(receiptId) => {
              setSelectedReceiptId(receiptId);
              setShowDeletePopup(true);
            }}
            onShowDetailAdd={handleShowDetailForm}
            onShowDetailView={handleViewReceipt}
          />
        </>
      )}
    </div>
  );
};

export default ImportReceipts;