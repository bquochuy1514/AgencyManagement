import React, { useState } from 'react';
import ReportList from '../components/report/ReportList';
import ReportForm from '../components/report/ReportForm';
import ReportDetail from '../components/report/ReportDetail';

const ReportManagement = () => {
  const [reports, setReports] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportType, setReportType] = useState('debt'); // Mặc định là debt

  const handleShowForm = (type) => {
    setReportType(type);
    setShowForm(true);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold text-red-500 mb-4">Quản lý Báo cáo</h1>
      <div className="mb-4">
        <button
          onClick={() => handleShowForm('debt')}
          className="bg-blue-600 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
        >
          Thêm Báo cáo công nợ
        </button>
        <button
          onClick={() => handleShowForm('sales')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Thêm Báo cáo doanh số
        </button>
      </div>
      {showForm && (
        <ReportForm
          onCancel={() => setShowForm(false)}
          setReports={setReports}
          reportType={reportType}
        />
      )}
      <ReportList
        reports={reports}
        setReports={setReports} // Đảm bảo prop này được truyền và sử dụng
        reportType={reportType}
      />
      {selectedReport && (
        <ReportDetail
          report={{ ...selectedReport, type: reportType }}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
};

export default ReportManagement;