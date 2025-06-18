const BASE_URL = 'http://localhost:8080';

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

export const getProductById = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/product/getProductById?productId=${productId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Không thể lấy chi tiết sản phẩm: ${response.status}`);
    const result = await response.json();
    return { status: result.status, data: result.data, message: result.message };
  } catch (err) {
    console.error('Lỗi getProductById:', err.message);
    throw err;
  }
};


export const createProduct = async (productData) => {
  try {
    const response = await fetch(`${BASE_URL}/product/addProduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error(`Không thể tạo sản phẩm: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.error('Lỗi trong createProduct:', err.message);
    throw err;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/product/deleteProduct/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Không thể xóa sản phẩm: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.error('Lỗi trong deleteProduct:', err.message);
    throw err;
  }
};

// Thêm các hàm còn thiếu
export const increaseInventory = async (productId, quantity) => {
  try {
    const response = await fetch(`${BASE_URL}/increaseInventory?productId=${productId}&quantity=${quantity}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Không thể tăng tồn kho: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.error('Lỗi trong increaseInventory:', err.message);
    throw err;
  }
};

export const decreaseInventory = async (productId, quantity) => {
  try {
    const response = await fetch(`${BASE_URL}/decreaseInventory?productId=${productId}&quantity=${quantity}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Không thể giảm tồn kho: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.error('Lỗi trong decreaseInventory:', err.message);
    throw err;
  }
};

export const getInventoryQuantity = async (productName) => {
  try {
    const response = await fetch(`${BASE_URL}/getInventoryQuantity?productName=${productName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Không thể lấy số lượng tồn kho: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.error('Lỗi trong getInventoryQuantity:', err.message);
    throw err;
  }
};

