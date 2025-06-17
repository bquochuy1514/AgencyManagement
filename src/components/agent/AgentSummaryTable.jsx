// src/components/agent/AgentSummaryTable.jsx
import React from "react";

const AgentSummaryTable = ({ agents, onDetailClick }) => {
  return (
    <div className="overflow-x-auto bg-gray-800 rounded-lg">
      <table className="w-full text-white">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2 border-b">STT</th>
            <th className="p-2 border-b">Tên đại lý</th>
            <th className="p-2 border-b">Loại</th>
            <th className="p-2 border-b">Quận</th>
            <th className="p-2 border-b">Tiền nợ hiện tại</th>
            <th className="p-2 border-b">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent, index) => (
            <tr key={agent.agentID} className="hover:bg-gray-700">
              <td className="p-2 border-b text-center">{index + 1}</td>
              <td className="p-2 border-b">{agent.agentName}</td>
              <td className="p-2 border-b">{agent.agentTypeID?.agentTypeName || '---'}</td>
              <td className="p-2 border-b">{agent.districtID?.districtName || '---'}</td>
              <td className="p-2 border-b text-right">{agent.debtMoney?.toLocaleString('vi-VN')}₫</td>
              <td className="p-2 border-b text-center">
                <button
                  onClick={() => onDetailClick(agent.agentID)}
                  className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentSummaryTable;