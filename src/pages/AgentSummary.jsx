// src/pages/AgentSummary.jsx
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AgentSummaryTable from "../components/agent/AgentSummaryTable";
import AgentTransactionHistory from "../components/agent/AgentTransactionHistory";
import { getAllAgents } from "../services/agentService";

const AgentSummary = () => {
  const [agents, setAgents] = useState([]);
  const [selectedAgentId, setSelectedAgentId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    setLoading(true);
    try {
      const response = await getAllAgents();
      if (response.data) {
        setAgents(response.data);
      } else {
        setAgents([]);
        toast.warning("Không có dữ liệu đại lý!");
      }
    } catch (err) {
      toast.error("Lỗi khi tải danh sách đại lý!");
    } finally {
      setLoading(false);
    }
  };

  const handleDetailClick = (agentId) => {
    setSelectedAgentId(agentId);
  };

  const handleClosePopup = () => {
    setSelectedAgentId(null);
  };

  return (
    <div className="p-6 bg-[#1a2634] rounded-lg min-h-screen">
      <h2 className="text-2xl font-semibold text-white mb-4">DANH SÁCH ĐẠI LÝ TỔNG QUÁT</h2>
      {loading ? (
        <p className="text-white">Đang tải dữ liệu...</p>
      ) : agents.length > 0 ? (
        <AgentSummaryTable agents={agents} onDetailClick={handleDetailClick} />
      ) : (
        <p className="text-gray-400">Không có đại lý nào!</p>
      )}
      {selectedAgentId && <AgentTransactionHistory agentId={selectedAgentId} onClose={handleClosePopup} />}
    </div>
  );
};

export default AgentSummary;