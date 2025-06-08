import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AgentManagement from './pages/AgentManagement';
import ExportReceipts from './pages/ExportReceipts';
import HomePage from './pages/HomePage';
import ImportReceipts from './pages/ImportReceipts';
import ProductManagement from './pages/ProductManagement';

function App() {
  const Placeholder = ({ pageName }) => (
    <div className="flex flex-col items-center justify-center py-12 mt-28">
      <h1 className="text-3xl font-bold mb-4">{pageName}</h1>
      <p className="text-gray-600 text-xl">Trang này đang được phát triển</p>
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/agents" element={<AgentManagement />} />
          <Route path="/export-receipts" element={<ExportReceipts />} />
          <Route path="/import-receipts" element={<ImportReceipts />} />
          <Route path="/payments" element={<Placeholder pageName="Thu tiền" />} />
          <Route path="/reports" element={<Placeholder pageName="Báo cáo" />} />
          <Route path="/regulations" element={<Placeholder pageName="Quy định" />} />
          <Route path="*" element={<Placeholder pageName="Trang không tồn tại" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;