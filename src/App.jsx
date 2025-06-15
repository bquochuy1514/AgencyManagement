// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import MainLayout from './components/layout/MainLayout';
// import AgentManagement from './pages/AgentManagement';
// import ExportReceipts from './pages/ExportReceipts';
// import HomePage from './pages/HomePage';
// import ImportReceipts from './pages/ImportReceipts';
// import ProductManagement from './pages/ProductManagement';
// import ReceiptDetails from './components/receipt/ReceiptDetails';

// function App() {
//   const Placeholder = ({ pageName }) => (
//     <div className="flex flex-col items-center justify-center py-12 mt-28">
//       <h1 className="text-3xl font-bold mb-4">{pageName}</h1>
//       <p className="text-gray-600 text-xl">Trang này đang được phát triển</p>
//     </div>
//   );

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<MainLayout />}>
//           <Route index element={<HomePage />} />
//           <Route path="/products" element={<ProductManagement />} />
//           <Route path="/agents" element={<AgentManagement />} />
//           <Route path="/export-receipts" element={<ExportReceipts />} />
//           <Route path="/import-receipts" element={<ImportReceipts />} />
//           <Route path="/receipts/:type/:receiptId/details" element={<ReceiptDetails />} /> {/* Thêm route chi tiết */}
//           <Route path="/payments" element={<Placeholder pageName="Thu tiền" />} />
//           <Route path="/reports" element={<Placeholder pageName="Báo cáo" />} />
//           <Route path="/regulations" element={<Placeholder pageName="Quy định" />} />
//           <Route path="*" element={<Placeholder pageName="Trang không tồn tại" />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, createContext } from 'react';
import MainLayout from './components/layout/MainLayout';
import AgentManagement from './pages/AgentManagement';
import ExportReceipts from './pages/ExportReceipts';
import HomePage from './pages/HomePage';
import ImportReceipts from './pages/ImportReceipts';
import ProductManagement from './pages/ProductManagement';
import ReceiptDetails from './components/receipt/ReceiptDetails';
import ProductDetails from './components/product/ProductDetails';
import { ToastContainer } from 'react-toastify';

export const ReceiptContext = createContext();
export const ProductContext = createContext();

function App() {
	const [receipts, setReceipts] = useState({
		import: [],
		export: [],
	});
	const [products, setProducts] = useState([]); // State chung cho products

	const updateReceipts = (newReceipts) => {
		setReceipts((prev) => ({ ...prev, ...newReceipts }));
	};
	const updateProducts = (newProducts) => {
		setProducts(newProducts);
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
			<ProductContext.Provider value={{ products, updateProducts }}>
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
								element={<Placeholder pageName="Thu tiền" />}
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
				/>
			</ProductContext.Provider>
		</ReceiptContext.Provider>
	);
}

export default App;
