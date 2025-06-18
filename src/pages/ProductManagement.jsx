
import React, { useState, useEffect, useContext } from 'react';
import ProductList from '../components/product/ProductList';
import ProductForm from '../components/product/ProductForm';
import { ProductContext } from '../App';

const ProductManagement = () => {
  const { products, updateProducts } = useContext(ProductContext);
  const [localProducts, setLocalProducts] = useState([
    {
      productID: 1,
      productName: 'Sản phẩm A',
      unit: { unitName: 'Cái' },
      importPrice: 100000,
      exportPrice: 120000,
      inventoryQuantity: 50,
    },
    {
      productID: 2,
      productName: 'Sản phẩm B',
      unit: { unitName: 'Hộp' },
      importPrice: 200000,
      exportPrice: 250000,
      inventoryQuantity: 30,
    },
  ]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Đồng bộ dữ liệu ban đầu khi component mount
    if (localProducts.length > 0 && products.length === 0) {
      updateProducts([...localProducts]);
    }
  }, [localProducts, products, updateProducts]);

  useEffect(() => {
    // Cập nhật localProducts khi products từ context thay đổi
    if (products.length > 0) {
      setLocalProducts([...products]);
    }
  }, [products]);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleSetProducts = (newProducts) => {
    setLocalProducts([...newProducts]);
    updateProducts([...newProducts]);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold text-red-500 mb-4">Quản lý Sản phẩm</h1>
      {showForm && (
        <ProductForm
          onCancel={handleCancel}
          setShowForm={setShowForm}
          products={localProducts}
          setProducts={handleSetProducts}
        />
      )}
      <ProductList
        products={localProducts}
        setProducts={handleSetProducts}
        onShowForm={handleShowForm}
      />
    </div>
  );
};

export default ProductManagement;