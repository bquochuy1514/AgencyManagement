import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AgentManagement from './pages/AgentManagement';
import ProductManagement from './pages/ProductManagement';
import HomePage from './pages/HomePage';

function App() {
	// Placeholder component cho các trang chưa tạo
	const Placeholder = ({ pageName }) => (
		<div className="flex flex-col items-center justify-center py-12 mt-28">
			<h1 className="text-3xl font-bold mb-4">{pageName}</h1>
			<p className="text-gray-600 text-xl">
				Trang này đang được phát triển
			</p>
		</div>
	);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route index element={<HomePage />} />
					<Route path="/products" element={<ProductManagement />} />
					<Route path="/agents" element={<AgentManagement />} />
					<Route path="*" element={<Placeholder />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
