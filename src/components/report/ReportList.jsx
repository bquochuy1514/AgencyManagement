import React, { useState } from 'react';

const ReportList = ({ reports, setReports, reportType }) => {
  const [filterMonth, setFilterMonth] = useState('');
  const [filterYear, setFilterYear] = useState('');

  const filteredReports = reports.filter((report) => {
    const matchesMonth = filterMonth ? report.month === parseInt(filterMonth) : true;
    const matchesYear = filterYear ? report.year === parseInt(filterYear) : true;
    return matchesMonth && matchesYear;
  });

  // Hàm xóa báo cáo (giả lập để sử dụng setReports)
  const handleDelete = (reportId) => {
    const updatedReports = reports.filter((report) => report.reportId !== reportId);
    setReports(updatedReports);
  };

  return (
    <div className="p-6 bg-gray-700 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-blue-400">{reportType === 'debt' ? 'Danh sách Báo cáo công nợ' : 'Danh sách Báo cáo doanh số'}</h2>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Tháng"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
          className="p-2 bg-gray-800 text-white rounded mr-2"
        />
        <input
          type="number"
          placeholder="Năm"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="p-2 bg-gray-800 text-white rounded"
        />
      </div>
      <table className="w-full text-left">
        <thead className="bg-gray-600 text-gray-300">
          <tr>
            <th className="px-4 py-2">Tháng</th>
            <th className="px-4 py-2">Năm</th>
            <th className="px-4 py-2">Agent ID</th>
            {reportType === 'debt' && (
              <>
                <th className="px-4 py-2">Nợ đầu kỳ</th>
                <th className="px-4 py-2">Nợ phát sinh</th>
                <th className="px-4 py-2">Nợ cuối kỳ</th>
                <th className="px-4 py-2">Hành động</th>
              </>
            )}
            {reportType === 'sales' && (
              <>
                <th className="px-4 py-2">Số lượng phiếu xuất</th>
                <th className="px-4 py-2">Tổng giá trị</th>
                <th className="px-4 py-2">Tỷ lệ (%)</th>
                <th className="px-4 py-2">Hành động</th>
              </>
            )}
          </tr>
        </thead>
        <tbody className="text-gray-200">
          {filteredReports.map((report) => (
            <tr key={report.reportId} className="border-t border-gray-700">
              <td className="px-4 py-2">{report.month}</td>
              <td className="px-4 py-2">{report.year}</td>
              <td className="px-4 py-2">{report.agentId}</td>
              {reportType === 'debt' && (
                <>
                  <td className="px-4 py-2">{report.firstDebt.toLocaleString()} đ</td>
                  <td className="px-4 py-2">{report.arisenDebt.toLocaleString()} đ</td>
                  <td className="px-4 py-2">{report.lastDebt.toLocaleString()} đ</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(report.reportId)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Xóa
                    </button>
                  </td>
                </>
              )}
              {reportType === 'sales' && (
                <>
                  <td className="px-4 py-2">{report.quantityExportReceipt}</td>
                  <td className="px-4 py-2">{report.totalValue.toLocaleString()} đ</td>
                  <td className="px-4 py-2">{report.proportion.toFixed(2)}%</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(report.reportId)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Xóa
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportList;