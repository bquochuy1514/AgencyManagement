import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const productService = {
  getAllProducts: async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  },

  getProductById: async (productID) => {
    const response = await axios.get(`${API_URL}/products/${productID}`);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await axios.post(`${API_URL}/products`, productData);
    return response.data;
  },

  updateProduct: async (productID, productData) => {
    const response = await axios.put(`${API_URL}/products/${productID}`, productData);
    return response.data;
  },

  deleteProduct: async (productID) => {
    const response = await axios.delete(`${API_URL}/products/${productID}`);
    return response.data;
  },

  getInventoryQuantity: async (productName) => {
    const response = await axios.get(`${API_URL}/products?productName=${productName}`);
    return response.data.length > 0 ? response.data[0].inventoryQuantity : 0;
  }
};

export const unitService = {
  getAllUnits: async () => {
    const response = await axios.get(`${API_URL}/units`);
    return response.data;
  },

  addUnit: async (unitData) => {
    const response = await axios.post(`${API_URL}/units`, unitData);
    return response.data;
  }
};