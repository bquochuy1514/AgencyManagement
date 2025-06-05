// productService.js
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
      throw new Error(`Failed to fetch products: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.error('Error in getAllProducts:', err.message);
    throw err; // Ném lỗi để component xử lý
  }
};

export const createProduct = async (productData) => {
    try {
      const response = await fetch(`${BASE_URL}/product/createProduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error(`Không thể tạo sản phẩm: ${response.status} - ${response.statusText}`);
      }
      const newProduct = await response.json();
      console.log('Sản phẩm mới:', newProduct); // Log để kiểm tra dữ liệu trả về
      return newProduct;
    } catch (err) {
      console.error('Lỗi trong createProduct:', err.message);
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
      throw new Error(`Failed to fetch product details: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.error('Error in getProductById:', err.message);
    throw err;
  }
};

export const getInventoryQuantity = async (productName) => {
  try {
    const response = await fetch(`${BASE_URL}/product/getInventoryQuantity?productName=${productName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch inventory quantity: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.error('Error in getInventoryQuantity:', err.message);
    throw err;
  }
};