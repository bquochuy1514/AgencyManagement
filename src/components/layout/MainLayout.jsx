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
						<span className="text-purple-500">Agent</span>
						<span className="text-red-500">Management</span>
					</div>
					<ul className="space-y-2 cursor-pointer">
						<li>
							<Link
								to="/"
								className="flex items-center p-2 hover:bg-gray-700 rounded"
							>
								<FaPlusCircle className="w-5 h-5 mr-2" />
								Trang chủ
							</Link>
						</li>
						<li>
							<Link
								to="/agents"
								className="flex items-center p-2 hover:bg-gray-700 rounded"
							>
								<FaFileExport className="w-5 h-5 mr-2" />
								Đại lý
							</Link>
						</li>
						<li>
							<Link
								to="/payments"
								className="flex items-center p-2 hover:bg-gray-700 rounded"
							>
								<FaMoneyBillWave className="w-5 h-5 mr-2" />
								Thu tiền
							</Link>
						</li>
						<li>
							<Link
								to="/reports"
								className="flex items-center p-2 hover:bg-gray-700 rounded"
							>
								<FaChartBar className="w-5 h-5 mr-2" />
								Báo cáo
							</Link>
						</li>
						<li>
							<Link
								to="/regulations"
								className="flex items-center p-2 hover:bg-gray-700 rounded"
							>
								<FaUserShield className="w-5 h-5 mr-2" />
								Quy Định
							</Link>
						</li>
						<li>
							<Link
								to="/products"
								className="flex items-center p-2 hover:bg-gray-700 rounded"
							>
								<FaBoxOpen className="w-5 h-5 mr-2" />
								Hàng hoá
							</Link>
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
