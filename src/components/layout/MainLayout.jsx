import React from 'react';
import {
	FaPlusCircle,
	FaFileExport,
	FaMoneyBillWave,
	FaChartBar,
	FaUserShield,
	FaBoxOpen,
} from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';

const MainLayout = () => {
	return (
		<>
			<div className="flex h-screen text-white">
				<div className="fixed w-64 h-full bg-gray-800 p-4">
					<div className="text-xl font-bold mb-6 flex items-center">
						<span className="text-purple-500">Desk</span>
						<span className="text-red-500">App</span>
					</div>
					<ul className="space-y-2 cursor-pointer">
						<li className="flex items-center p-2 hover:bg-gray-700 rounded">
							<FaPlusCircle className="w-5 h-5 mr-2" />
							<Link to="/">Đại lý</Link>
						</li>
						<li className="flex items-center p-2 hover:bg-gray-700 rounded">
							<FaFileExport className="w-5 h-5 mr-2" />
							Xuất hàng
						</li>
						<li className="flex items-center p-2 hover:bg-gray-700 rounded">
							<FaMoneyBillWave className="w-5 h-5 mr-2" />
							Thu tiền
						</li>
						<li className="flex items-center p-2 hover:bg-gray-700 rounded">
							<FaChartBar className="w-5 h-5 mr-2" />
							Báo cáo
						</li>
						<li className="flex items-center p-2 hover:bg-gray-700 rounded">
							<FaUserShield className="w-5 h-5 mr-2" />
							Quy Định
						</li>
						<li className="flex items-center p-2 hover:bg-gray-700 rounded">
							<FaBoxOpen className="w-5 h-5 mr-2" />
							<Link to="/products">Hàng hoá</Link>
						</li>
					</ul>
				</div>
				<div className="ml-64 flex-1 p-6">
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default MainLayout;
