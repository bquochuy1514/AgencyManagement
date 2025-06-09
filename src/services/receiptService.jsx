const BASE_URL = 'http://localhost:8080';

export const getAllImportReceipts = async (date) => {
  try {
    const response = await fetch(`${BASE_URL}/importReceiptbyImportDate?dateReceipt=${date}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Không thể lấy danh sách phiếu nhập: ${response.status} - ${response.statusText}`);
    }
    const result = await response.json();
    return { status: result.status || 'success', data: result.data || [], message: result.message || 'Lấy danh sách phiếu nhập thành công' };
  } catch (err) {
    console.error('Lỗi trong getAllImportReceipts:', err.message);
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
      body: JSON.stringify(data), // Xóa [data] nếu API không yêu cầu mảng
    });
    if (!response.ok) {
      throw new Error(`Không thể tạo phiếu nhập: ${response.status} - ${response.statusText}`);
    }
    const result = await response.json();
    return { status: result.status || 'success', data: result.data, message: result.message || 'Tạo phiếu nhập thành công' };
  } catch (err) {
    console.error('Lỗi trong addImportReceipt:', err.message);
    throw err;
  }
};

export const getImportReceiptById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/importReceiptbyID?importReceiptID=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Không thể lấy chi tiết phiếu nhập: ${response.status} - ${response.statusText}`);
    }
    const result = await response.json();
    return { status: result.status || 'success', data: result.data, message: result.message || 'Lấy chi tiết phiếu nhập thành công' };
  } catch (err) {
    console.error('Lỗi trong getImportReceiptById:', err.message);
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
      body: JSON.stringify(data), // Thử gửi data trực tiếp thay vì [data]
    });
    if (!response.ok) {
      throw new Error(`Không thể tạo chi tiết nhập: ${response.status} - ${response.statusText}`);
    }
    const result = await response.json();
    return { status: result.status || 'success', data: result.data, message: result.message || 'Tạo chi tiết nhập thành công' };
  } catch (err) {
    console.error('Lỗi trong addImportDetail:', err.message);
    throw err;
  }
};

export const getImportDetailByReceiptId = async (importReceiptId) => {
  try {
    const response = await fetch(`${BASE_URL}/importDetailbyImportReceiptID?importReceiptID=${importReceiptId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Không thể lấy chi tiết nhập theo phiếu: ${response.status} - ${response.statusText}`);
    }
    const result = await response.json();
    return { status: result.status || 'success', data: result.data || [], message: result.message || 'Lấy chi tiết nhập thành công' };
  } catch (err) {
    console.error('Lỗi trong getImportDetailByReceiptId:', err.message);
    throw err;
  }
};

export const getImportDetailByProductId = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/importDetailbyProductID?productID=${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Không thể lấy chi tiết nhập theo sản phẩm: ${response.status} - ${response.statusText}`);
    }
    const result = await response.json();
    return { status: result.status || 'success', data: result.data, message: result.message || 'Lấy chi tiết nhập thành công' };
  } catch (err) {
    console.error('Lỗi trong getImportDetailByProductId:', err.message);
    throw err;
  }
};

export const getImportDetailByReceiptAndProduct = async (importReceiptId, productId) => {
  try {
    const response = await fetch(`${BASE_URL}/importDetailbyImportReceiptIDandProductID?importReceiptID=${importReceiptId}&productID=${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Không thể lấy chi tiết nhập theo phiếu và sản phẩm: ${response.status} - ${response.statusText}`);
    }
    const result = await response.json();
    return { status: result.status || 'success', data: result.data, message: result.message || 'Lấy chi tiết nhập thành công' };
  } catch (err) {
    console.error('Lỗi trong getImportDetailByReceiptAndProduct:', err.message);
    throw err;
  }
};

// Thêm export cho phiếu xuất nếu cần
export const getExportDetailByReceiptId = async (exportReceiptId) => {
  try {
    const response = await fetch(`${BASE_URL}/exportDetail/getExportDetailByReceiptId?exportReceiptId=${exportReceiptId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Không thể lấy chi tiết phiếu xuất: ${response.status} - ${response.statusText}`);
    }
    const result = await response.json();
    return { status: result.status || 'success', data: result.data || [], message: result.message || 'Lấy chi tiết phiếu xuất thành công' };
  } catch (err) {
    console.error('Lỗi trong getExportDetailByReceiptId:', err.message);
    throw err;
  }
};

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
    return { status: result.status || 'success', data: result.data, message: result.message || 'Tạo phiếu xuất thành công' };
  } catch (err) {
    console.error('Lỗi trong addExportReceipt:', err.message);
    throw err;
  }
};

export const getAllExportReceipts = async (dateReceipt = new Date().toISOString().split('T')[0]) => {
  try {
    const response = await fetch(`${BASE_URL}/exportReceipt/getExportReceiptByDate?dateReceipt=${dateReceipt}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Không thể lấy danh sách phiếu xuất: ${response.status} - ${response.statusText}`);
    }
    const result = await response.json();
    const data = Array.isArray(result.data) ? result.data : result.data ? [result.data] : [];
    return { status: result.status || 'success', data, message: result.message || 'Lấy danh sách phiếu xuất thành công' };
  } catch (err) {
    console.error('Lỗi trong getAllExportReceipts:', err.message);
    throw err;
  }
};