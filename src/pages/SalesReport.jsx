// src/pages/SalesReport.jsx (không thay đổi nhiều)
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SalesReportForm from "../components/report/SalesReportForm";
import SalesReportTable from "../components/report/SalesReportTable";
import SalesReportExport from "../components/report/SalesReportExport";
import { addSalesReport, getSalesReportByMonthAndYear } from "../services/reportService";

const SalesReport = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async ({ month, year }) => {
    setLoading(true);
    try {
      await addSalesReport({ agentID: 1, month, year });
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

  return (
    <div className="p-6 bg-[#1a2634] rounded-lg min-h-screen">
      <h2 className="text-2xl font-semibold text-white mb-4">Biểu Cáo Doanh Số</h2>
      <SalesReportForm onSubmit={handleFormSubmit} />
      {loading ? (
        <p className="text-white">Đang tải dữ liệu...</p>
      ) : reportData.length > 0 ? (
        <>
          <SalesReportTable data={reportData} />
          <SalesReportExport data={reportData} />
        </>
      ) : (
        <p className="text-gray-400">Chưa có dữ liệu báo cáo. Vui lòng chọn tháng/năm!</p>
      )}
    </div>
  );
};

export default SalesReport;