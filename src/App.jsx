import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, createContext, useEffect } from 'react';
import MainLayout from './components/layout/MainLayout';
import AgentManagement from './pages/AgentManagement';
import ExportReceipts from './pages/ExportReceipts';
import HomePage from './pages/HomePage';
import ImportReceipts from './pages/ImportReceipts';
import ProductManagement from './pages/ProductManagement';
import ReceiptDetails from './components/receipt/ReceiptDetails';
import ProductDetails from './components/product/ProductDetails';
import { ToastContainer } from 'react-toastify';
import PaymentReceipt from './pages/PaymentReceipt';
import 'react-toastify/dist/ReactToastify.css';

export const ReceiptContext = createContext();
export const ProductContext = createContext({
  products: [],
  units: [],
  updateProducts: () => {},
});

function App() {
  const [receipts, setReceipts] = useState({
    import: [],
    export: [],
  });
  
  const [productData, setProductData] = useState({
    products: [],
    units: []
  });

  // Khởi tạo dữ liệu sản phẩm và đơn vị tính
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [productsRes, unitsRes] = await Promise.all([
          fetch('http://localhost:3001/products'),
          fetch('http://localhost:3001/units')
        ]);
        
        const products = await productsRes.json();
        const units = await unitsRes.json();
        
        setProductData({
          products: products.data || [],
          units: units.data || []
        });
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu ban đầu:', error);
      }
    };
    
    fetchInitialData();
  }, []);

  const updateReceipts = (newReceipts) => {
    setReceipts((prev) => ({ ...prev, ...newReceipts }));
  };

  const updateProducts = (newProducts) => {
    setProductData(prev => ({
      ...prev,
      products: newProducts
    }));
  };

  const Placeholder = ({ pageName }) => (
    <div className="flex flex-col items-center justify-center py-12 mt-28">
      <h1 className="text-3xl font-bold mb-4">{pageName}</h1>
      <p className="text-gray-600 text-xl">
        Trang này đang được phát triển
      </p>
    </div>
  );

  return (
    <ReceiptContext.Provider value={{ receipts, updateReceipts }}>
      <ProductContext.Provider value={{ 
        products: productData.products, 
        units: productData.units,
        updateProducts 
      }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route
                path="/products"
                element={<ProductManagement />}
              />
              <Route
                path="/products/detail/:id"
                element={<ProductDetails />}
              />
              <Route
                path="/agents"
                element={<AgentManagement />}
              />
              <Route
                path="/export-receipts"
                element={<ExportReceipts />}
              />
              <Route
                path="/import-receipts"
                element={<ImportReceipts />}
              />
              <Route
                path="/receipts/:type/:receiptId/details"
                element={<ReceiptDetails />}
              />
              <Route
                path="/payments"
                element={<PaymentReceipt />}
              />
              <Route
                path="/reports"
                element={<Placeholder pageName="Báo cáo" />}
              />
              <Route
                path="/regulations"
                element={<Placeholder pageName="Quy định" />}
              />
              <Route
                path="*"
                element={
                  <Placeholder pageName="Trang không tồn tại" />
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </ProductContext.Provider>
    </ReceiptContext.Provider>
  );
}

export default App;