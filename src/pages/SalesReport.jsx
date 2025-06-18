// // src/pages/SalesReport.jsx (không thay đổi nhiều)
// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import SalesReportForm from "../components/report/SalesReportForm";
// import SalesReportTable from "../components/report/SalesReportTable";
// import SalesReportExport from "../components/report/SalesReportExport";
// import { addSalesReport, getSalesReportByMonthAndYear } from "../services/reportService";

// const SalesReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleFormSubmit = async ({ month, year }) => {
//     setLoading(true);
//     try {
//       await addSalesReport({ agentID: 1, month, year });
//       const response = await getSalesReportByMonthAndYear(month, year);
//       if (response.data) {
//         setReportData([response.data]);
//       } else {
//         setReportData([]);
//         toast.warning("Không có dữ liệu báo cáo cho tháng/năm này!");
//       }
//     } catch (err) {
//       toast.error("Lỗi khi tải báo cáo doanh số!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-[#1a2634] rounded-lg min-h-screen">
//       <h2 className="text-2xl font-semibold text-white mb-4">Biểu Cáo Doanh Số</h2>
//       <SalesReportForm onSubmit={handleFormSubmit} />
//       {loading ? (
//         <p className="text-white">Đang tải dữ liệu...</p>
//       ) : reportData.length > 0 ? (
//         <>
//           <SalesReportTable data={reportData} />
//           <SalesReportExport data={reportData} />
//         </>
//       ) : (
//         <p className="text-gray-400">Chưa có dữ liệu báo cáo. Vui lòng chọn tháng/năm!</p>
//       )}
//     </div>
//   );
// };

// export default SalesReport;


import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const BASE_URL = "http://localhost:8080";

const addSalesReport = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/salesReport/addSalesReport`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Lỗi khi tạo báo cáo: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Lỗi addSalesReport:", err.message);
    throw err;
  }
};

const getSalesReportByMonthAndYear = async (month, year) => {
  try {
    const response = await fetch(`${BASE_URL}/getSalesReportByMonthAndYear?month=${month}&year=${year}`);
    if (!response.ok) throw new Error(`Lỗi khi lấy báo cáo: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Lỗi getSalesReportByMonthAndYear:", err.message);
    throw err;
  }
};

export const addSalesReportDetail = async (data) => {
    try {
      const response = await fetch(`${BASE_URL}/salesReportDetail/addSalesReportDetail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`Lỗi khi tạo chi tiết báo cáo: ${response.status}`);
      return await response.json();
    } catch (err) {
      console.error("Lỗi addSalesReportDetail:", err.message);
      throw err;
    }
  };

const getSalesReportDetailByAgentId = async (agentId) => {
  try {
    const response = await fetch(`${BASE_URL}/getSalesReportDetailByAgentId?agentId=${agentId}`);
    if (!response.ok) throw new Error(`Lỗi khi lấy chi tiết báo cáo: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Lỗi getSalesReportDetailByAgentId:", err.message);
    throw err;
  }
};

const SalesReport = () => {
  const [reportData, setReportData] = useState([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [agentID, setAgentID] = useState("");
  const [agents, setAgents] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchAgents = async () => {
    try {
      const res = await fetch("http://localhost:3001/agent/getAllAgents");
      const data = await res.json();
      if (data.code === 200) setAgents(data.data);
    } catch (err) {
      console.error("Lỗi khi fetch đại lý:", err);
      toast.error("Lỗi khi tải danh sách đại lý!");
    }
  };

  const fetchReports = async () => {
    if (!month || !year) return;
    setLoading(true);
    try {
      const response = await getSalesReportByMonthAndYear(month, year);
      if (response.data) {
        setReportData([response.data]);
      } else {
        setReportData([]);
        toast.warning("Không có dữ liệu báo cáo cho tháng/năm này!");
      }
    } catch (err) {
      toast.error("Lỗi khi tải báo cáo doanh số!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  useEffect(() => {
    fetchReports();
  }, [month, year]);

  const handleCreateReport = async () => {
    if (!month || !year || !agentID) {
      toast.error("Vui lòng chọn đầy đủ tháng, năm và đại lý!");
      return;
    }
    setLoading(true);
    try {
      await addSalesReport({ agentID: parseInt(agentID), month: parseInt(month), year: parseInt(year) });
      toast.success("Tạo báo cáo doanh số thành công!");
      fetchReports();
    } catch (err) {
      toast.error("Lỗi khi tạo báo cáo doanh số!");
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    const worksheetData = reportData.map((item, index) => ({
      STT: index + 1,
      "Đại Lý/Số Phiếu Xuất": `${item.agentName} (${item.quantityExportReceipt})`,
      "Tổng Trị Giá Lệ": `${item.totalValue.toLocaleString()} VNĐ (${item.proportion.toFixed(1)}%)`,
    }));
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SalesReport");
    XLSX.writeFile(workbook, "SalesReport.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Báo Cáo Doanh Số", 10, 10);
    doc.autoTable({
      head: [["STT", "Đại Lý/Số Phiếu Xuất", "Tổng Trị Giá Lệ"]],
      body: reportData.map((item, index) => [
        index + 1,
        `${item.agentName} (${item.quantityExportReceipt})`,
        `${item.totalValue.toLocaleString()} VNĐ (${item.proportion.toFixed(1)}%)`,
      ]),
    });
    doc.save("SalesReport.pdf");
  };

  const handleViewDetail = async (report) => {
    setSelectedReport(report);
    setShowDetailPopup(true);
    try {
      const detail = await getSalesReportDetailByAgentId(report.agentID);
      setSelectedReport({ ...report, details: detail.data });
    } catch (err) {
      toast.error("Lỗi khi tải chi tiết báo cáo!");
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold text-yellow-400 mb-4">Báo Cáo Doanh Số</h1>

      <div className="flex space-x-4 mb-6">
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded"
        >
          <option value="">-- Tháng --</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{`Tháng ${i + 1}`}</option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded"
        >
          <option value="">-- Năm --</option>
          {[2023, 2024, 2025].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <select
          value={agentID}
          onChange={(e) => setAgentID(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded"
        >
          <option value="">-- Chọn Đại Lý --</option>
          {agents.map((agent) => (
            <option key={agent.agentID} value={agent.agentID}>
              {agent.agentName}
            </option>
          ))}
        </select>

        <button
          onClick={handleCreateReport}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tạo báo cáo doanh số
        </button>
      </div>

      {loading ? (
        <p className="text-white">Đang tải dữ liệu...</p>
      ) : reportData.length > 0 ? (
        <>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-2">STT</th>
                  <th className="py-3 px-4">Đại Lý/Số Phiếu Xuất</th>
                  <th className="py-3 px-4">Tổng Trị Giá Lệ</th>
                  <th className="py-3 px-4">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                    <td className="py-3 px-2">{index + 1}</td>
                    <td className="py-3 px-4">{`${item.agentName} (${item.quantityExportReceipt})`}</td>
                    <td className="py-3 px-4">{`${item.totalValue.toLocaleString()} VNĐ (${item.proportion.toFixed(1)}%)`}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleViewDetail(item)}
                        className="text-green-400 hover:text-green-300"
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex space-x-4">
            <button
              onClick={exportToExcel}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Xuất Excel
            </button>
            <button
              onClick={exportToPDF}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Xuất PDF
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-400">Chưa có dữ liệu báo cáo. Vui lòng chọn tháng/năm!</p>
      )}

      {showDetailPopup && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-lg w-[600px] max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Chi Tiết Báo Cáo - {selectedReport.agentName}</h2>
            <p><strong>Số Phiếu Xuất:</strong> {selectedReport.quantityExportReceipt}</p>
            <p><strong>Tổng Trị Giá:</strong> {selectedReport.totalValue.toLocaleString()} VNĐ</p>
            <p><strong>Tỷ Lệ:</strong> {selectedReport.proportion.toFixed(1)}%</p>
            <p className="mt-4 italic text-sm">
              (Chi tiết báo cáo doanh số sẽ hiển thị ở đây)
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDetailPopup(false)}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesReport;