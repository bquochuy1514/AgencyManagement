const BASE_URL = 'http://localhost:8080';

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/product/allProduct`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Không thể lấy danh sách sản phẩm: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.error('Lỗi trong getAllProducts:', err.message);
    throw err;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/product/productbyID?productID=${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Không thể lấy chi tiết sản phẩm: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.error('Lỗi trong getProductById:', err.message);
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