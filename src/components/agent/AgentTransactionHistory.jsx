// src/components/agent/AgentTransactionHistory.jsx
import React, { useState, useEffect } from "react";

const AgentTransactionHistory = ({ agentId, onClose }) => {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgentDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/agent/getAgentById?agentId=${agentId}`);
        const data = await response.json();
        if (data.code === 200) {
          setAgent(data.data);
        }
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết đại lý:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAgentDetails();
  }, [agentId]);

  if (loading) return <p className="text-white">Đang tải...</p>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-1/2">
        <h3 className="text-xl font-semibold text-white mb-4">Chi tiết đại lý - ID: {agentId}</h3>
        {agent ? (
          <div className="space-y-4">
            <p><strong>Tên đại lý:</strong> {agent.agentName}</p>
            <p><strong>Loại:</strong> {agent.agentTypeID?.agentTypeName || '---'}</p>
            <p><strong>Quận:</strong> {agent.districtID?.districtName || '---'}</p>
            <p><strong>Tiền nợ hiện tại:</strong> {agent.debtMoney?.toLocaleString('vi-VN')}₫</p>
          </div>
        ) : (
          <p className="text-gray-400">Không tìm thấy thông tin đại lý.</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default AgentTransactionHistory;