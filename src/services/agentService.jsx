const BASE_URL = 'http://localhost:8080';

export const getAllAgents = async () => {
  try {
    const response = await fetch(`${BASE_URL}/agent/getAllAgents`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Không thể lấy danh sách đại lý: ${response.status}`);
    const result = await response.json();
    return { status: result.status, data: result.data || [], message: result.message };
  } catch (err) {
    console.error('Lỗi getAllAgents:', err.message);
    throw err;
  }
};