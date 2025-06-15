// const BASE_URL = 'http://localhost:8080';

// // Import Receipt APIs
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
//       body: JSON.stringify([data]), // API yêu cầu mảng
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

// export const getImportDetailByProductId = async (productId) => {
//   try {
//     const response = await fetch(`${BASE_URL}/importDetailbyProductID?productID=${productId}`, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     if (!response.ok) throw new Error(`Không thể lấy chi tiết nhập theo sản phẩm: ${response.status}`);
//     const result = await response.json();
//     return { status: result.status, data: result.data || [], message: result.message };
//   } catch (err) {
//     console.error('Lỗi getImportDetailByProductId:', err.message);
//     throw err;
//   }
// };

// export const getImportDetailByReceiptAndProduct = async (importReceiptId, productId) => {
//   try {
//     const response = await fetch(`${BASE_URL}/importDetailbyImportReceiptIDandProductID?importReceiptID=${importReceiptId}&productID=${productId}`, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     if (!response.ok) throw new Error(`Không thể lấy chi tiết nhập theo phiếu và sản phẩm: ${response.status}`);
//     const result = await response.json();
//     return { status: result.status, data: result.data, message: result.message };
//   } catch (err) {
//     console.error('Lỗi getImportDetailByReceiptAndProduct:', err.message);
//     throw err;
//   }
// };

// // Export Receipt APIs
// export const getAllExportReceipts = async (dateReceipt = new Date().toISOString().split('T')[0]) => {
//   try {
//     const response = await fetch(`${BASE_URL}/getExportReceiptByDate?dateReceipt=${dateReceipt}`, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     if (!response.ok) throw new Error(`Không thể lấy danh sách phiếu xuất: ${response.status}`);
//     const result = await response.json();
//     return { status: result.status, data: result.data || [], message: result.message };
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
//       body: JSON.stringify(data),
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
//     const response = await fetch(`${BASE_URL}/getExportReceiptById?exportReceiptId=${exportReceiptId}`, {
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

// export const addExportDetail = async (data) => {
//   try {
//     const response = await fetch(`${BASE_URL}/exportDetail/addExportDetail`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
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
//     const response = await fetch(`${BASE_URL}/getExportDetailByReceiptId?exportReceiptId=${exportReceiptId}`, {
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

// export const getExportDetailByProductId = async (productId) => {
//   try {
//     const response = await fetch(`${BASE_URL}/getExportDetailByProductId?productId=${productId}`, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     if (!response.ok) throw new Error(`Không thể lấy chi tiết xuất theo sản phẩm: ${response.status}`);
//     const result = await response.json();
//     return { status: result.status, data: result.data || [], message: result.message };
//   } catch (err) {
//     console.error('Lỗi getExportDetailByProductId:', err.message);
//     throw err;
//   }
// };

// export const getExportDetailByReceiptAndProduct = async (exportReceiptId, productId) => {
//   try {
//     const response = await fetch(`${BASE_URL}/getExportDetailByReceiptAndProduct?exportReceiptId=${exportReceiptId}&productId=${productId}`, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     if (!response.ok) throw new Error(`Không thể lấy chi tiết xuất theo phiếu và sản phẩm: ${response.status}`);
//     const result = await response.json();
//     return { status: result.status, data: result.data, message: result.message };
//   } catch (err) {
//     console.error('Lỗi getExportDetailByReceiptAndProduct:', err.message);
//     throw err;
//   }
// };
// export const getAllProducts = async () => {
//   try {
//     const response = await fetch(`${BASE_URL}/getAllProducts`, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     if (!response.ok) throw new Error(`Không thể lấy danh sách sản phẩm: ${response.status}`);
//     const result = await response.json();
//     return { status: result.status, data: result.data || [], message: result.message };
//   } catch (err) {
//     console.error('Lỗi getAllProducts:', err.message);
//     throw err;
//   }
// };
const BASE_URL = 'http://localhost:8080';

// Lấy danh sách phiếu nhập theo ngày
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

// Tạo phiếu nhập mới
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

// Lấy chi tiết phiếu nhập theo ID
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

// Thêm chi tiết mặt hàng vào phiếu nhập
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

// Lấy danh sách chi tiết mặt hàng theo phiếu nhập
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

// Lấy danh sách chi tiết nhập theo sản phẩm
export const getImportDetailByProductId = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/importDetailbyProductID?productID=${productId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Không thể lấy chi tiết nhập theo sản phẩm: ${response.status}`);
    const result = await response.json();
    return { status: result.status, data: result.data || [], message: result.message };
  } catch (err) {
    console.error('Lỗi getImportDetailByProductId:', err.message);
    throw err;
  }
};

// Lấy chi tiết nhập theo phiếu và sản phẩm
export const getImportDetailByReceiptAndProduct = async (importReceiptId, productId) => {
  try {
    const response = await fetch(`${BASE_URL}/importDetailbyImportReceiptIDandProductID?importReceiptID=${importReceiptId}&productID=${productId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Không thể lấy chi tiết nhập theo phiếu và sản phẩm: ${response.status}`);
    const result = await response.json();
    return { status: result.status, data: result.data, message: result.message };
  } catch (err) {
    console.error('Lỗi getImportDetailByReceiptAndProduct:', err.message);
    throw err;
  }
};

// Lấy danh sách sản phẩm
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

// Lấy danh sách đơn vị tính
export const getAllUnits = async () => {
  try {
    const response = await fetch(`${BASE_URL}/unit/getAllUnits`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Không thể lấy danh sách đơn vị tính: ${response.status}`);
    const result = await response.json();
    return { status: result.status, data: result.data || [], message: result.message };
  } catch (err) {
    console.error('Lỗi getAllUnits:', err.message);
    throw err;
  }
};