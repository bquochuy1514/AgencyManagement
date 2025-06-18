// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import ImportReceiptForm from "../components/receipt/ImportReceiptForm";
// import ImportList from "../components/receipt/ImportList";
// import { ReceiptContext } from "../App";
// import { getAllImportReceipts } from "../services/receiptService";
// import { toast } from "react-toastify";

// const ImportReceipts = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().split("T")[0]
//   );
//   const { receipts, updateReceipts } = useContext(ReceiptContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchReceipts = async () => {
//       try {
//         const { data } = await getAllImportReceipts(selectedDate);
//         updateReceipts({ import: data });
//       } catch (err) {
//        // console.error("Lỗi khi lấy phiếu nhập:", err);
//        // toast.error("Lỗi khi tải danh sách phiếu nhập!");
//       }
//     };
//     fetchReceipts();
//   }, [selectedDate, updateReceipts]);

//   const handleAddReceipt = async (newReceipt) => {
//     setShowForm(false);
//     updateReceipts({ import: [...receipts.import, newReceipt] });
//     toast.success("Thêm phiếu nhập thành công!");
//   };

//   const handleShowReceiptDetails = (receiptId) => {
//     navigate(`/receipts/import/${receiptId}/details`);
//   };

//   return (
//     <div className="p-6 bg-[#1a2634] rounded-lg min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-2xl font-semibold text-white">QUẢN LÝ PHIẾU NHẬP</h2>
//           <p className="text-sm text-gray-400">
//             Quản lý danh sách phiếu nhập và thông tin chi tiết
//           </p>
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
//       {showForm && (
//         <ImportReceiptForm
//           onCancel={() => setShowForm(false)}
//           onSuccess={handleAddReceipt}
//         />
//       )}
//       <ImportList
//         receipts={receipts.import}
//         onShowDetailView={handleShowReceiptDetails}
//       />
//     </div>
//   );
// };

// export default ImportReceipts;


import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImportReceiptForm from "../components/receipt/ImportReceiptForm";
import ImportList from "../components/receipt/ImportList";
import { ReceiptContext } from "../App";
import { getAllImportReceipts } from "../services/receiptService";
import { toast } from "react-toastify";

const ImportReceipts = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const { receipts, updateReceipts } = useContext(ReceiptContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const { data } = await getAllImportReceipts(selectedDate);
        updateReceipts({ import: data });
      } catch (err) {
        toast.error("Lỗi khi tải danh sách phiếu nhập!");
      }
    };
    fetchReceipts();
  }, [selectedDate, updateReceipts]);

  const handleAddReceipt = async (newReceipt) => {
    setShowForm(false);
    updateReceipts({ import: [...receipts.import, newReceipt] });
    toast.success("Thêm phiếu nhập thành công!");
  };

  const handleShowReceiptDetails = (receiptId) => {
    navigate(`/receipts/import/${receiptId}/details`);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-yellow-400">QUẢN LÝ PHIẾU NHẬP</h2>
          <p className="text-sm text-gray-400">
            Quản lý danh sách phiếu nhập và thông tin chi tiết
          </p>
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
            + Thêm Phiếu Nhập Mới
          </button>
        </div>
      </div>
      {showForm && (
        <ImportReceiptForm
          onCancel={() => setShowForm(false)}
          onSuccess={handleAddReceipt}
        />
      )}
      <ImportList
        receipts={receipts.import}
        onShowDetailView={handleShowReceiptDetails}
      />
    </div>
  );
};

export default ImportReceipts;