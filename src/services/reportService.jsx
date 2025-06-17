// src/services/reportService.jsx
const BASE_URL = "http://localhost:8080";

export const addSalesReport = async (data) => {
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

export const getSalesReportByMonthAndYear = async (month, year) => {
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

export const getSalesReportDetailByAgentId = async (agentId) => {
  try {
    const response = await fetch(`${BASE_URL}/getSalesReportDetailByAgentId?agentId=${agentId}`);
    if (!response.ok) throw new Error(`Lỗi khi lấy chi tiết báo cáo: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Lỗi getSalesReportDetailByAgentId:", err.message);
    throw err;
  }
};