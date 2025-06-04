import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ProductList from '../../src/components/product/ProductList';
import ProductForm from '../../src/components/product/ProductForm';
import ProductDetail from '../../src/components/product/ProductDetails';

const ProductManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.state?.message) {
      alert(location.state.message);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  return (
    <div className="product-management-page container mx-auto p-6">
      <h1 className="text-3xl font-bold text-red-500 mb-6 text-center">
        Quản lý Sản phẩm
      </h1>
      
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<ProductForm />} />
        <Route path="/edit/:id" element={<ProductForm />} />
        <Route path="/detail/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
};

export default ProductManagement;