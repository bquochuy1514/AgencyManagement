import React from 'react';

const ReportDetail = ({ report, onClose }) => {
  if (!report) return null;

  return (
    <div className="p-6 bg-gray-700 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-blue-400">Chi tiết {report.type === 'debt' ? 'Báo cáo công nợ' : 'Báo cáo doanh số'}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-300"><strong>Tháng:</strong></p>
          <p className="text-lg">{report.month}</p>
        </div>
        <div>
          <p className="text-gray-300"><strong>Năm:</strong></p>
          <p className="text-lg">{report.year}</p>
        </div>
        <div>
          <p className="text-gray-300"><strong>Agent ID:</strong></p>
          <p className="text-lg">{report.agentId}</p>
        </div>
        {report.type === 'debt' && (
          <>
            <div>
              <p className="text-gray-300"><strong>Nợ đầu kỳ:</strong></p>
              <p className="text-lg">{report.firstDebt.toLocaleString()} đ</p>
            </div>
            <div>
              <p className="text-gray-300"><strong>Nợ phát sinh:</strong></p>
              <p className="text-lg">{report.arisenDebt.toLocaleString()} đ</p>
            </div>
            <div>
              <p className="text-gray-300"><strong>Nợ cuối kỳ:</strong></p>
              <p className="text-lg">{report.lastDebt.toLocaleString()} đ</p>
            </div>
          </>
        )}
        {report.type === 'sales' && (
          <>
            <div>
              <p className="text-gray-300"><strong>Số lượng phiếu xuất:</strong></p>
              <p className="text-lg">{report.quantityExportReceipt}</p>
            </div>
            <div>
              <p className="text-gray-300"><strong>Tổng giá trị:</strong></p>
              <p className="text-lg">{report.totalValue.toLocaleString()} đ</p>
            </div>
            <div>
              <p className="text-gray-300"><strong>Tỷ lệ:</strong></p>
              <p className="text-lg">{report.proportion.toFixed(2)}%</p>
            </div>
          </>
        )}
      </div>
      <button
        onClick={onClose}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Đóng
      </button>
    </div>
  );
};

export default ReportDetail;