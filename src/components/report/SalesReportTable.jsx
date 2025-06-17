// src/components/report/SalesReportTable.jsx
import React from "react";

const SalesReportTable = ({ data }) => {
  return (
    <div className="overflow-x-auto bg-gray-800 rounded-lg">
      <table className="w-full text-white">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2 border-b">STT</th>
            <th className="p-2 border-b">Đại Lý/Số Phiếu Xuất</th>
            <th className="p-2 border-b">Tổng Trị Giá Lệ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-700">
              <td className="p-2 border-b text-center">{index + 1}</td>
              <td className="p-2 border-b">{`${item.agentName} (${item.quantityExportReceipt})`}</td>
              <td className="p-2 border-b text-right">{`${item.totalValue.toLocaleString()} VNĐ (${item.proportion.toFixed(1)}%)`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReportTable;