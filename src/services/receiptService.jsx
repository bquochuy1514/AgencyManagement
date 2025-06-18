
// const BASE_URL = 'http://localhost:8080';

// // Export Receipt APIs
// export const getAllExportReceipts = async (dateReceipt = new Date().toISOString().split('T')[0]) => {
//   try {
//     const response = await fetch(`${BASE_URL}/exportReceipt/getExportReceiptByDate?dateReceipt=${dateReceipt}`, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     if (!response.ok) throw new Error(`Không thể lấy danh sách phiếu xuất: ${response.status}`);
//     const result = await response.json();
//     return { status: result.status, data: Array.isArray(result.data) ? result.data : [result.data], message: result.message };
//   } catch (err) {
//     console.error('Lỗi getAllExportReceipts:', err.message);
//     throw err;
//   }
// };

// export const addExportReceipt = async (data) => {
//   try {
//     const response = await fetch(`${BASE_URL}/exportReceipt/addExportReceipt`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify([data]),
//     });
//     if (!response.ok) throw new Error(`Không thể tạo phiếu xuất: ${response.status}`);
//     const result = await response.json();
//     return { status: result.status, data: result.data, message: result.message };
//   } catch (err) {
//     console.error('Lỗi addExportReceipt:', err.message);
//     throw err;
//   }
// };

// export const getExportReceiptById = async (exportReceiptId) => {
//   try {
//     const response = await fetch(`${BASE_URL}/exportReceipt/getExportReceiptById?exportReceiptId=${exportReceiptId}`, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     if (!response.ok) throw new Error(`Không thể lấy chi tiết phiếu xuất: ${response.status}`);
//     const result = await response.json();
//     return { status: result.status, data: result.data, message: result.message };
//   } catch (err) {
//     console.error('Lỗi getExportReceiptById:', err.message);
//     throw err;
//   }
// };

// // Export Detail APIs
// export const addExportDetail = async (data) => {
//   try {
//     const response = await fetch(`${BASE_URL}/exportDetail/addExportDetail`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify([data]),
//     });
//     if (!response.ok) throw new Error(`Không thể tạo chi tiết xuất: ${response.status}`);
//     const result = await response.json();
//     return { status: result.status, data: result.data, message: result.message };
//   } catch (err) {
//     console.error('Lỗi addExportDetail:', err.message);
//     throw err;
//   }
// };

// export const getExportDetailByReceiptId = async (exportReceiptId) => {
//   try {
//     const response = await fetch(`${BASE_URL}/exportDetail/getExportDetailByReceiptId?exportReceiptId=${exportReceiptId}`, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     if (!response.ok) throw new Error(`Không thể lấy chi tiết xuất: ${response.status}`);
//     const result = await response.json();
//     return { status: result.status, data: result.data || [], message: result.message };
//   } catch (err) {
//     console.error('Lỗi getExportDetailByReceiptId:', err.message);
//     throw err;
//   }
// };

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

export const deleteExportReceipt = async (exportReceiptId) => {
  try {
    const response = await fetch(`${BASE_URL}/exportReceipt/delete?exportReceiptId=${exportReceiptId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Không thể xóa phiếu xuất: ${response.status}`);
    const result = await response.json();
    return { status: result.status, message: result.message };
  } catch (err) {
    console.error('Lỗi deleteExportReceipt:', err.message);
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

export const getExportDetailByProductId = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/exportDetail/getExportDetailByProductId?productId=${productId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Không thể lấy chi tiết xuất: ${response.status}`);
    const result = await response.json();
    return { status: result.status, data: result.data || [], message: result.message };
  } catch (err) {
    console.error('Lỗi getExportDetailByProductId:', err.message);
    throw err;
  }
};

export const getExportDetailByReceiptAndProduct = async (exportReceiptId, productId) => {
  try {
    const response = await fetch(`${BASE_URL}/exportDetail/getExportDetailByReceiptAndProduct?exportReceiptId=${exportReceiptId}&productId=${productId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Không thể lấy chi tiết xuất: ${response.status}`);
    const result = await response.json();
    return { status: result.status, data: result.data || [], message: result.message };
  } catch (err) {
    console.error('Lỗi getExportDetailByReceiptAndProduct:', err.message);
    throw err;
  }
};

// Import Receipt APIs
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
      body: JSON.stringify([data]),
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

// Import Detail APIs
export const addImportDetail = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/importDetail/addImportDetail`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([data]),
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

// Product APIs
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/product/getAllProducts`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Không thể lấy danh sách sản phẩm: ${response.status}`);
    const result = await response.json();
    return { status: result.status, data: result.data || [], message: result.message };
  } catch (err) {
    console.error('Lỗi getAllProducts:', err.message);
    throw err;
  }
};

export const getInventoryQuantity = async (productName) => {
  try {
    const response = await fetch(`${BASE_URL}/product/getInventoryQuantity?productName=${encodeURIComponent(productName)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Không thể lấy số lượng tồn kho: ${response.status}`);
    const result = await response.json();
    return { status: result.status, data: result.data, message: result.message };
  } catch (err) {
    console.error('Lỗi getInventoryQuantity:', err.message);
    throw err;
  }
};

// Unit APIs
export const getAllUnits = async () => {
  try {
    const response = await fetch(`${BASE_URL}/unit/all`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Không thể lấy danh sách đơn vị: ${response.status}`);
    const result = await response.json();
    return { status: result.status, data: result.data || [], message: result.message };
  } catch (err) {
    console.error('Lỗi getAllUnits:', err.message);
    throw err;
  }
};

// Agent APIs
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

// Supplier APIs
export const getAllSuppliers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/supplier/getAllSuppliers`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Không thể lấy danh sách nhà cung cấp: ${response.status}`);
    const result = await response.json();
    return { status: result.status, data: result.data || [], message: result.message };
  } catch (err) {
    console.error('Lỗi getAllSuppliers:', err.message);
    throw err;
  }
};