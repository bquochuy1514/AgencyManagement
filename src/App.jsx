import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AgentManagement from './pages/AgentManagement'; 
import ProductManagement from './pages/ProductManagement'; 

function App() {
  const Placeholder = ({ pageName }) => (
    <div className="flex flex-col items-center justify-center py-12 mt-28">
      <h1 className="text-3xl font-bold mb-4">{pageName}</h1>
      <p className="text-gray-600 text-xl">Trang này đang được phát triển</p>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<AgentManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="*" element={<Placeholder pageName="404 - Không tìm thấy" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;