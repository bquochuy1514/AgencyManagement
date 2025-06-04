import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AgentManagement from './pages/AgentManagement';
import ProductManagement from './pages/ProductManagement';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route index element={<AgentManagement />} />
					<Route path="/products" element={<ProductManagement />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
