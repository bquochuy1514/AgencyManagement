// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import React, { useState, useEffect, createContext } from "react";
// import MainLayout from "./components/layout/MainLayout";
// import AgentManagement from "./pages/AgentManagement";
// import ExportReceipts from "./pages/ExportReceipts";
// import HomePage from "./pages/HomePage";
// import ImportReceipts from "./pages/ImportReceipts";
// import ProductManagement from "./pages/ProductManagement";
// import ReceiptDetails from "./components/receipt/ReceiptDetails";
// import ProductDetails from "./components/product/ProductDetails";
// import { ToastContainer, toast } from "react-toastify";
// import PaymentReceipt from "./pages/PaymentReceipt";
// import {
//   getAllImportReceipts,
// } from "./services/receiptService";
// import {
//   getAllProducts,
//   getProductById,
// } from "./services/productService";
// import {
//   getAllUnits,
// } from "./services/unitService";

// export const ReceiptContext = createContext();
// export const ProductContext = createContext({
//   products: [],
//   units: [],
//   updateProducts: () => {},
//   updateUnits: () => {},
// });

// function App() {
//   const [receipts, setReceipts] = useState({ import: [], export: [] });
//   const [products, setProducts] = useState([]);
//   const [units, setUnits] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         const productsResponse = await getAllProducts();
//         setProducts(productsResponse.data || []);

//         const unitsResponse = await getAllUnits();
//         setUnits(unitsResponse.data || []);

//         const importReceiptsResponse = await getAllImportReceipts();
//         setReceipts({ import: importReceiptsResponse.data || [], export: [] });
//       } catch (err) {
//         // console.error("Lỗi khi tải dữ liệu ban đầu:", err);
//         // toast.error("Lỗi khi tải dữ liệu ban đầu. Vui lòng thử lại!");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchInitialData();
//   }, []);

//   const updateReceipts = (newReceipts) => {
//     setReceipts((prev) => ({ ...prev, ...newReceipts }));
//   };

//   const updateProducts = (newProducts) => {
//     setProducts(newProducts);
//   };

//   const updateUnits = (newUnits) => {
//     setUnits(newUnits);
//   };

//   const Placeholder = ({ pageName }) => (
//     <div className="flex flex-col items-center justify-center py-12 mt-28">
//       <h1 className="text-3xl font-bold mb-4">{pageName}</h1>
//       <p className="text-gray-600 text-xl">Trang này đang được phát triển</p>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-xl text-gray-600">Đang tải dữ liệu...</p>
//       </div>
//     );
//   }

//   return (
//     <ReceiptContext.Provider value={{ receipts, updateReceipts }}>
//       <ProductContext.Provider
//         value={{ products, updateProducts, units, updateUnits }}
//       >
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<MainLayout />}>
//               <Route index element={<HomePage />} />
//               <Route path="/products" element={<ProductManagement />} />
//               <Route path="/products/detail/:id" element={<ProductDetails />} />
//               <Route path="/agents" element={<AgentManagement />} />
//               <Route path="/export-receipts" element={<ExportReceipts />} />
//               <Route path="/import-receipts" element={<ImportReceipts />} />
//               <Route
//                 path="/receipts/:type/:receiptId/details"
//                 element={<ReceiptDetails />}
//               />
//               <Route path="/payments" element={<PaymentReceipt />} />
//               <Route
//                 path="/reports"
//                 element={<Placeholder pageName="Báo cáo" />}
//               />
//               <Route
//                 path="/regulations"
//                 element={<Placeholder pageName="Quy định" />}
//               />
//               <Route
//                 path="*"
//                 element={<Placeholder pageName="Trang không tồn tại" />}
//               />
//             </Route>
//           </Routes>
//         </BrowserRouter>
//         <ToastContainer
//           position="top-right"
//           autoClose={2000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//         />
//       </ProductContext.Provider>
//     </ReceiptContext.Provider>
//   );
// }

// export default App;
import AgentSummary from "./pages/AgentSummary";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect, createContext } from "react";
import MainLayout from "./components/layout/MainLayout";
import AgentManagement from "./pages/AgentManagement";
import ExportReceipts from "./pages/ExportReceipts";
import HomePage from "./pages/HomePage";
import ImportReceipts from "./pages/ImportReceipts";
import ProductManagement from "./pages/ProductManagement";
import ExportReceiptDetails from "./components/receipt/ExportReceiptDetails";
import ProductDetails from "./components/product/ProductDetails";
import PaymentReceipts from "./pages/PaymentReceipt"; // Import component phiếu thu tiền
import { ToastContainer, toast } from "react-toastify";
import SalesReport from "./pages/SalesReport";
import {
  getAllImportReceipts,
  getAllExportReceipts,
} from "./services/receiptService";
import {
  getAllProducts,
} from "./services/productService";
import {
  getAllUnits,
} from "./services/unitService";

export const ReceiptContext = createContext();
export const ProductContext = createContext({
  products: [],
  units: [],
  updateProducts: () => {},
  updateUnits: () => {},
});

function App() {
  const [receipts, setReceipts] = useState({ import: [], export: [] });
  const [products, setProducts] = useState([]);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const productsResponse = await getAllProducts();
        setProducts(productsResponse.data || []);

        const unitsResponse = await getAllUnits();
        setUnits(unitsResponse.data || []);

        const importReceiptsResponse = await getAllImportReceipts();
        const exportReceiptsResponse = await getAllExportReceipts();
        setReceipts({
          import: importReceiptsResponse.data || [],
          export: importReceiptsResponse.data || [],
        });
      } catch (err) {
        toast.error("Lỗi khi tải dữ liệu ban đầu. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const updateReceipts = (newReceipts) => {
    setReceipts((prev) => ({ ...prev, ...newReceipts }));
  };

  const updateProducts = (newProducts) => {
    setProducts(newProducts);
  };

  const updateUnits = (newUnits) => {
    setUnits(newUnits);
  };

  const Placeholder = ({ pageName }) => (
    <div className="flex flex-col items-center justify-center py-12 mt-28">
      <h1 className="text-3xl font-bold mb-4">{pageName}</h1>
      <p className="text-gray-600 text-xl">Trang này đang được phát triển</p>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-600">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <ReceiptContext.Provider value={{ receipts, updateReceipts }}>
      <ProductContext.Provider value={{ products, updateProducts, units, updateUnits }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/products" element={<ProductManagement />} />
              <Route path="/products/detail/:id" element={<ProductDetails />} />
              <Route path="/agents" element={<AgentManagement />} />
              <Route path="/export-receipts" element={<ExportReceipts />} />
              <Route path="/import-receipts" element={<ImportReceipts />} />
              <Route path="/receipts/export/:receiptId/details" element={<ExportReceiptDetails />} />
              <Route path="/payments" element={<PaymentReceipts />} /> {/* Cập nhật route */}
              <Route path="/reports" element={<Placeholder pageName="Báo cáo" />} />
              <Route path="/regulations" element={<Placeholder pageName="Quy định" />} />
              <Route path="*" element={<Placeholder pageName="Trang không tồn tại" />} />
              <Route path="/sales-report" element={<SalesReport />} />
              <Route path="/agent-summary" element={<AgentSummary />} />
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
        />
      </ProductContext.Provider>
    </ReceiptContext.Provider>
  );
}

export default App;