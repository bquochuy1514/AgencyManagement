import React, { useState } from 'react';

const ReportForm = ({ onCancel, setReports, reportType }) => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [agentId, setAgentId] = useState('');
  const [firstDebt, setFirstDebt] = useState('');
  const [arisenDebt, setArisenDebt] = useState('');
  const [quantityExportReceipt, setQuantityExportReceipt] = useState('');
  const [totalValue, setTotalValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReport = {
      reportId: Date.now(), // ID giả lập
      agentId: parseInt(agentId),
      month: parseInt(month),
      year: parseInt(year),
      ...(reportType === 'debt' && {
        firstDebt: parseInt(firstDebt),
        arisenDebt: parseInt(arisenDebt),
        lastDebt: parseInt(firstDebt) + parseInt(arisenDebt),
      }),
      ...(reportType === 'sales' && {
        quantityExportReceipt: parseInt(quantityExportReceipt),
        totalValue: parseInt(totalValue),
        proportion: (parseInt(totalValue) / 20000000) * 100, // Giả lập tỷ lệ (tổng doanh thu giả định 20 triệu)
      }),
    };
    setReports((prev) => [...prev, newReport]);
    onCancel();
  };

  return (
    <div className="p-6 bg-gray-700 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-blue-400">Thêm {reportType === 'debt' ? 'Báo cáo công nợ' : 'Báo cáo doanh số'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300">Tháng</label>
          <input
            type="number"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300">Năm</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300">Agent ID</label>
          <input
            type="number"
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded"
            required
          />
        </div>
        {reportType === 'debt' && (
          <>
            <div>
              <label className="block text-gray-300">Nợ đầu kỳ</label>
              <input
                type="number"
                value={firstDebt}
                onChange={(e) => setFirstDebt(e.target.value)}
                className="w-full p-2 bg-gray-800 text-white rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300">Nợ phát sinh</label>
              <input
                type="number"
                value={arisenDebt}
                onChange={(e) => setArisenDebt(e.target.value)}
                className="w-full p-2 bg-gray-800 text-white rounded"
                required
              />
            </div>
          </>
        )}
        {reportType === 'sales' && (
          <>
            <div>
              <label className="block text-gray-300">Số lượng phiếu xuất</label>
              <input
                type="number"
                value={quantityExportReceipt}
                onChange={(e) => setQuantityExportReceipt(e.target.value)}
                className="w-full p-2 bg-gray-800 text-white rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300">Tổng giá trị</label>
              <input
                type="number"
                value={totalValue}
                onChange={(e) => setTotalValue(e.target.value)}
                className="w-full p-2 bg-gray-800 text-white rounded"
                required
              />
            </div>
          </>
        )}
        <div className="flex space-x-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Thêm
          </button>
          <button type="button" onClick={onCancel} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;