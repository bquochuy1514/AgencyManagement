// import React, { useState } from 'react';
// import {
//   FaPlusCircle,
//   FaFileExport,
//   FaMoneyBillWave,
//   FaChartBar,
//   FaUserShield,
//   FaBoxOpen,
//   FaBars,
//   FaFileImport,
// } from 'react-icons/fa';
// import { NavLink, Outlet } from 'react-router-dom';

// const MainLayout = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="flex min-h-screen text-white">
//       <div
//         className={`fixed inset-y-0 left-0 w-64 bg-gray-800 p-4 transform transition-transform duration-300 ease-in-out z-50 ${
//           isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } md:translate-x-0 md:static md:inset-auto md:z-auto`}
//       >
//         <div className="text-xl font-bold mb-6 flex items-center justify-between">
//           <div>
//             <span className="text-purple-500">Agent</span>
//             <span className="text-red-500">Management</span>
//           </div>
//           <button onClick={toggleSidebar} className="md:hidden">
//             <FaBars className="w-5 h-5 text-white" />
//           </button>
//         </div>

//         <ul className="space-y-2 cursor-pointer">
//           <li>
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 `flex items-center p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
//               }
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <FaPlusCircle className="w-5 h-5 mr-2" />
//               Trang chủ
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/agents"
//               className={({ isActive }) =>
//                 `flex items-center p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
//               }
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <FaFileExport className="w-5 h-5 mr-2" />
//               Đại lý
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/import-receipts"
//               className={({ isActive }) =>
//                 `flex items-center p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
//               }
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <FaFileImport className="w-5 h-5 mr-2" />
//               Phiếu nhập
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/export-receipts"
//               className={({ isActive }) =>
//                 `flex items-center p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
//               }
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <FaFileExport className="w-5 h-5 mr-2" />
//               Phiếu xuất
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/payments"
//               className={({ isActive }) =>
//                 `flex items-center p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
//               }
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <FaMoneyBillWave className="w-5 h-5 mr-2" />
//               Thu tiền
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/reports"
//               className={({ isActive }) =>
//                 `flex items-center p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
//               }
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <FaChartBar className="w-5 h-5 mr-2" />
//               Báo cáo
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/regulations"
//               className={({ isActive }) =>
//                 `flex items-center p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
//               }
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <FaUserShield className="w-5 h-5 mr-2" />
//               Quy định
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/products"
//               className={({ isActive }) =>
//                 `flex items-center p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
//               }
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <FaBoxOpen className="w-5 h-5 mr-2" />
//               Hàng hóa
//             </NavLink>
//           </li>
//         </ul>
//       </div>

//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//           onClick={toggleSidebar}
//         ></div>
//       )}

//       <div className="flex-1 flex flex-col">
//         <main className="flex-1 overflow-y-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;
import React, { useState } from 'react';
import {
  FaPlusCircle,
  FaFileExport,
  FaMoneyBillWave,
  FaChartBar,
  FaUserShield,
  FaBoxOpen,
  FaBars,
  FaFileImport,
  FaUsers,
  FaCog,
} from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen text-white">
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 p-4 transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:inset-auto md:z-auto`}
      >
        <div className="text-xl font-bold mb-6 flex items-center justify-between">
          <div>
            <span className="text-purple-500">Agent</span>
            <span className="text-red-500">Management</span>
          </div>
          <button onClick={toggleSidebar} className="md:hidden">
            <FaBars className="w-5 h-5 text-white" />
          </button>
        </div>

        <ul className="space-y-2 cursor-pointer">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaPlusCircle className="w-5 h-5 mr-2" />
              Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/agents"
              className={({ isActive }) =>
                `flex items-center p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaUserShield className="w-5 h-5 mr-2" />
              Quản lý đại lý
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/import-receipts"
              className={({ isActive }) =>
                `flex items-center p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaFileImport className="w-5 h-5 mr-2" />
              Phiếu nhập hàng
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/export-receipts"
              className={({ isActive }) =>
                `flex items-center p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaFileExport className="w-5 h-5 mr-2" />
              Phiếu xuất hàng
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/payments"
              className={({ isActive }) =>
                `flex items-center p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaMoneyBillWave className="w-5 h-5 mr-2" />
              Phiếu thu tiền
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sales-report"
              className={({ isActive }) =>
                `flex items-center p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaChartBar className="w-5 h-5 mr-2" />
              Báo cáo doanh số
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/debt-report"
              className={({ isActive }) =>
                `flex items-center p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaChartBar className="w-5 h-5 mr-2" />
              Báo cáo công nợ
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/agent-summary"
              className={({ isActive }) =>
                `flex items-center p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaUsers className="w-5 h-5 mr-2" />
              Danh sách đại lý tổng hợp
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/parameter"
              className={({ isActive }) =>
                `flex items-center p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaCog className="w-5 h-5 mr-2" />
              Thiết lập hệ thống
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `flex items-center p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaBoxOpen className="w-5 h-5 mr-2" />
              Hàng hóa
            </NavLink>
          </li>
        </ul>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;