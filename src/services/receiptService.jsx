// const BASE_URL = 'http://localhost:8080';

// // Lấy danh sách phiếu nhập theo ngày
// export const getAllImportReceipts = async (dateReceipt = new Date().toISOString().split('T')[0]) => {
//   try {
//     const response = await fetch(`${BASE_URL}/importReceiptbyImportDate?dateReceipt=${dateReceipt}`, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     if (!response.ok) throw new Error(`Không thể lấy danh sách phiếu nhập: ${response.status}`);
//     const result = await response.json();
//     return { status: result.status, data: result.data || [], message: result.message };
//   } catch (err) {
//     console.error('Lỗi getAllImportReceipts:', err.message);
//     throw err;
//   }
// };

// // Tạo phiếu nhập mới
// export const addImportReceipt = async (data) => {
//   try {
//     const response = await fetch(`${BASE_URL}/importReceipt/addImportReceipt`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     });
//     if (!response.ok) throw new Error(`Không thể tạo phiếu nhập: ${response.status}`);
//     const result = await response.json();
//     return { status: result.status, data: result.data, message: result.message };
//   } catch (err) {
//     console.error('Lỗi addImportReceipt:', err.message);
//     throw err;
//   }
// };

// // Lấy chi tiết phiếu nhập theo ID
// export const getImportReceiptById = async (importReceiptId) => {
//   try {
//     const response = await fetch(`${BASE_URL}/importReceiptbyID?importReceiptID=${importReceiptId}`, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     if (!response.ok) throw new Error(`Không thể lấy chi tiết phiếu nhập: ${response.status}`);
//     const result = await response.json();
//     return { status: result.status, data: result.data, message: result.message };
//   } catch (err) {
//     console.error('Lỗi getImportReceiptById:', err.message);
//     throw err;
//   }
// };

// // Thêm chi tiết mặt hàng vào phiếu nhập
// export const addImportDetail = async (data) => {
//   try {
//     const response = await fetch(`${BASE_URL}/importDetail/addImportDetail`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     });
//     if (!response.ok) throw new Error(`Không thể tạo chi tiết nhập: ${response.status}`);
//     const result = await response.json();
//     return { status: result.status, data: result.data, message: result.message };
//   } catch (err) {
//     console.error('Lỗi addImportDetail:', err.message);
//     throw err;
//   }
// };

// // Lấy danh sách chi tiết mặt hàng theo phiếu nhập
// export const getImportDetailByReceiptId = async (importReceiptId) => {
//   try {
//     const response = await fetch(`${BASE_URL}/importDetailbyImportReceiptID?importReceiptID=${importReceiptId}`, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     if (!response.ok) throw new Error(`Không thể lấy chi tiết nhập: ${response.status}`);
//     const result = await response.json();
//     return { status: result.status, data: result.data || [], message: result.message };
//   } catch (err) {
//     console.error('Lỗi getImportDetailByReceiptId:', err.message);
//     throw err;
//   }
// };

// // Xóa phiếu nhập
// export const deleteImportReceipt = async (importReceiptId) => {
//   try {
//     const response = await fetch(`${BASE_URL}/importReceipt/delete?importReceiptID=${importReceiptId}`, {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     if (!response.ok) throw new Error(`Không thể xóa phiếu nhập: ${response.status}`);
//     const result = await response.json();
//     return { status: result.status, message: result.message };
//   } catch (err) {
//     console.error('Lỗi deleteImportReceipt:', err.message);
//     throw err;
//   }
// };






const BASE_URL = 'http://localhost:8080';

// Export Receipt APIs
export const getAllExportReceipts = async (dateReceipt = new Date().toISOString().split('T')[0]) => {
  try {
    const response = await fetch(`${BASE_URL}/exportReceipt/getExportReceiptByDate?dateReceipt=${dateReceipt}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Không thể lấy danh sách phiếu xuất: ${response.status}`);
    const result = await response.json();
    return { status: result.status, data: Array.isArray(result.data) ? result.data : [result.data], message: result.message };
  } catch (err) {
    console.error('Lỗi getAllExportReceipts:', err.message);
    throw err;
  }
};

export const addExportReceipt = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/exportReceipt/addExportReceipt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([data]),
    });
    if (!response.ok) throw new Error(`Không thể tạo phiếu xuất: ${response.status}`);
    const result = await response.json();
    return { status: result.status, data: result.data, message: result.message };
  } catch (err) {
    console.error('Lỗi addExportReceipt:', err.message);
    throw err;
  }
};

export const getExportReceiptById = async (exportReceiptId) => {
  try {
    const response = await fetch(`${BASE_URL}/exportReceipt/getExportReceiptById?exportReceiptId=${exportReceiptId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Không thể lấy chi tiết phiếu xuất: ${response.status}`);
    const result = await response.json();
    return { status: result.status, data: result.data, message: result.message };
  } catch (err) {
    console.error('Lỗi getExportReceiptById:', err.message);
    throw err;
  }
};

// Export Detail APIs
export const addExportDetail = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/exportDetail/addExportDetail`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([data]),
    });
    if (!response.ok) throw new Error(`Không thể tạo chi tiết xuất: ${response.status}`);
    const result = await response.json();
    return { status: result.status, data: result.data, message: result.message };
  } catch (err) {
    console.error('Lỗi addExportDetail:', err.message);
    throw err;
  }
};

export const getExportDetailByReceiptId = async (exportReceiptId) => {
  try {
    const response = await fetch(`${BASE_URL}/exportDetail/getExportDetailByReceiptId?exportReceiptId=${exportReceiptId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Không thể lấy chi tiết xuất: ${response.status}`);
    const result = await response.json();
    return { status: result.status, data: result.data || [], message: result.message };
  } catch (err) {
    console.error('Lỗi getExportDetailByReceiptId:', err.message);
    throw err;
  }
};

export const getAllImportReceipts = async (dateReceipt = new Date().toISOString().split('T')[0]) => {
  try {
    const response = await fetch(`${BASE_URL}/importReceiptbyImportDate?dateReceipt=${dateReceipt}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Không thể lấy danh sách phiếu nhập: ${response.status}`);
    const result = await response.json();
    return { status: result.status, data: result.data || [], message: result.message };
  } catch (err) {
    console.error('Lỗi getAllImportReceipts:', err.message);
    throw err;
  }
};


export const addImportReceipt = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/importReceipt/addImportReceipt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Không thể tạo phiếu nhập: ${response.status}`);
    const result = await response.json();
    return { status: result.status, data: result.data, message: result.message };
  } catch (err) {
    console.error('Lỗi addImportReceipt:', err.message);
    throw err;
  }
};

export const getImportReceiptById = async (importReceiptId) => {
  try {
    const response = await fetch(`${BASE_URL}/importReceiptbyID?importReceiptID=${importReceiptId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Không thể lấy chi tiết phiếu nhập: ${response.status}`);
    const result = await response.json();
    return { status: result.status, data: result.data, message: result.message };
  } catch (err) {
    console.error('Lỗi getImportReceiptById:', err.message);
    throw err;
  }
};


export const addImportDetail = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/importDetail/addImportDetail`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Không thể tạo chi tiết nhập: ${response.status}`);
    const result = await response.json();
    return { status: result.status, data: result.data, message: result.message };
  } catch (err) {
    console.error('Lỗi addImportDetail:', err.message);
    throw err;
  }
};

export const getImportDetailByReceiptId = async (importReceiptId) => {
  try {
    const response = await fetch(`${BASE_URL}/importDetailbyImportReceiptID?importReceiptID=${importReceiptId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Không thể lấy chi tiết nhập: ${response.status}`);
    const result = await response.json();
    return { status: result.status, data: result.data || [], message: result.message };
  } catch (err) {
    console.error('Lỗi getImportDetailByReceiptId:', err.message);
    throw err;
  }
};

export const deleteImportReceipt = async (importReceiptId) => {
  try {
    const response = await fetch(`${BASE_URL}/importReceipt/delete?importReceiptID=${importReceiptId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Không thể xóa phiếu nhập: ${response.status}`);
    const result = await response.json();
    return { status: result.status, message: result.message };
  } catch (err) {
    console.error('Lỗi deleteImportReceipt:', err.message);
    throw err;
  }
};