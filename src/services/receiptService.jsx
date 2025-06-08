const BASE_URL = 'http://localhost:8080';

export const addExportReceipt = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/exportReceipt/addExportReceipt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Không thể tạo phiếu xuất: ${response.status} - ${response.statusText}`);
    }
    const result = await response.json();
    return { status: result.status || 'success', data: result.data, message: result.message };
  } catch (err) {
    console.error('Lỗi trong addExportReceipt:', err.message);
    throw err;
  }
};

export const addImportDetail = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/importDetail/addImportDetail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Không thể tạo chi tiết nhập: ${response.status} - ${response.statusText}`);
    }
    const result = await response.json();
    return { status: result.status || 'success', data: result.data, message: result.message };
  } catch (err) {
    console.error('Lỗi trong addImportDetail:', err.message);
    throw err;
  }
};

export const addImportReceipt = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/importReceipt/addImportReceipt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Không thể tạo phiếu nhập: ${response.status} - ${response.statusText}`);
    }
    const result = await response.json();
    return { status: result.status || 'success', data: result.data, message: result.message };
  } catch (err) {
    console.error('Lỗi trong addImportReceipt:', err.message);
    throw err;
  }
};

export const getExportDetailByReceiptId = async (receiptId) => {
  try {
    const response = await fetch(`${BASE_URL}/exportDetail/getExportDetailByReceiptId?exportReceiptId=${receiptId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Không thể lấy chi tiết phiếu xuất: ${response.status} - ${response.statusText}`);
    }
    const result = await response.json();
    return { status: result.status || 'success', data: result.data, message: result.message };
  } catch (err) {
    console.error('Lỗi trong getExportDetailByReceiptId:', err.message);
    throw err;
  }
};

export const getAllExportReceipts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/exportReceipt/getExportReceiptByDate?dateReceipt=${new Date().toISOString().split('T')[0]}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Không thể lấy danh sách phiếu xuất: ${response.status} - ${response.statusText}`);
    }
    const result = await response.json();
    return { status: result.status || 'success', data: result.data ? [result.data] : [], message: result.message };
  } catch (err) {
    console.error('Lỗi trong getAllExportReceipts:', err.message);
    throw err;
  }
};

export const getAllImportReceipts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/importReceipt/importReceiptbyImportDate?dateReceipt=${new Date().toISOString().split('T')[0]}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Không thể lấy danh sách phiếu nhập: ${response.status} - ${response.statusText}`);
    }
    const result = await response.json();
    return { status: result.status || 'success', data: result.data ? [result.data] : [], message: result.message };
  } catch (err) {
    console.error('Lỗi trong getAllImportReceipts:', err.message);
    throw err;
  }
};