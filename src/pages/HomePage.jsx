import React from 'react';
import { FaUsers, FaMoneyCheckAlt, FaBox, FaChartLine } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const HomePage = () => {
	const cardVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};

	const textVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
	};

	return (
		<div className="p-6 bg-gray-900 min-h-screen text-white">
			{/* Welcome Section */}
			<motion.div
				className="mb-8"
				initial="hidden"
				animate="visible"
				variants={textVariants}
			>
				<h1 className="text-3xl font-bold text-red-500">Trang Chủ</h1>
				<p className="text-gray-400 mt-2">
					Chào mừng đến với hệ thống quản lý đại lý của bạn!
				</p>
			</motion.div>

			{/* Dashboard Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				<motion.div
					className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center space-x-4 hover:bg-gray-700 transition-colors"
					variants={cardVariants}
					initial="hidden"
					animate="visible"
				>
					<FaUsers className="text-purple-500 text-4xl" />
					<div>
						<h2 className="text-xl font-semibold">Tổng Đại Lý</h2>
						<p className="text-2xl font-bold text-gray-300">150</p>
						<p className="text-sm text-gray-500">
							+5% so với tháng trước
						</p>
					</div>
				</motion.div>

				<motion.div
					className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center space-x-4 hover:bg-gray-700 transition-colors"
					variants={cardVariants}
					initial="hidden"
					animate="visible"
					transition={{ delay: 0.1 }}
				>
					<FaMoneyCheckAlt className="text-green-500 text-4xl" />
					<div>
						<h2 className="text-xl font-semibold">Doanh Thu</h2>
						<p className="text-2xl font-bold text-gray-300">
							2.5 Tỷ
						</p>
						<p className="text-sm text-gray-500">
							+10% so với tháng trước
						</p>
					</div>
				</motion.div>

				<motion.div
					className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center space-x-4 hover:bg-gray-700 transition-colors"
					variants={cardVariants}
					initial="hidden"
					animate="visible"
					transition={{ delay: 0.2 }}
				>
					<FaBox className="text-blue-500 text-4xl" />
					<div>
						<h2 className="text-xl font-semibold">Hàng Xuất</h2>
						<p className="text-2xl font-bold text-gray-300">
							1,200
						</p>
						<p className="text-sm text-gray-500">
							+8% so với tháng trước
						</p>
					</div>
				</motion.div>

				<motion.div
					className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center space-x-4 hover:bg-gray-700 transition-colors"
					variants={cardVariants}
					initial="hidden"
					animate="visible"
					transition={{ delay: 0.3 }}
				>
					<FaChartLine className="text-yellow-500 text-4xl" />
					<div>
						<h2 className="text-xl font-semibold">Tăng Trưởng</h2>
						<p className="text-2xl font-bold text-gray-300">12%</p>
						<p className="text-sm text-gray-500">
							Tốt hơn tháng trước
						</p>
					</div>
				</motion.div>
			</div>

			{/* Top Agents Table */}
			<motion.div
				className="mb-8"
				initial="hidden"
				animate="visible"
				variants={textVariants}
			>
				<h2 className="text-2xl font-bold mb-4">Đại Lý Nổi Bật</h2>
				<div className="bg-gray-800 p-4 rounded-lg shadow-lg">
					<table className="w-full text-left">
						<thead>
							<tr className="border-b border-gray-700">
								<th className="py-2">Tên Đại Lý</th>
								<th className="py-2">Doanh Thu</th>
								<th className="py-2">Hàng Xuất</th>
							</tr>
						</thead>
						<tbody>
							<tr className="border-b border-gray-700">
								<td className="py-2">Đại Lý A</td>
								<td className="py-2">1.2 Tỷ</td>
								<td className="py-2">600</td>
							</tr>
							<tr className="border-b border-gray-700">
								<td className="py-2">Đại Lý B</td>
								<td className="py-2">0.9 Tỷ</td>
								<td className="py-2">450</td>
							</tr>
						</tbody>
					</table>
				</div>
			</motion.div>

			{/* News Section */}
			<motion.div
				className="mb-8"
				initial="hidden"
				animate="visible"
				variants={textVariants}
			>
				<h2 className="text-2xl font-bold mb-4">Thông Báo</h2>
				<div className="bg-gray-800 p-4 rounded-lg shadow-lg">
					<ul className="space-y-2">
						<li className="text-gray-300">
							Cập nhật giá hàng hóa ngày 06/06/2025
						</li>
						<li className="text-gray-300">
							Thông báo thanh toán trước ngày 10/06
						</li>
					</ul>
				</div>
			</motion.div>

			{/* Quick Actions Section */}
			<motion.div
				className="mt-8"
				initial="hidden"
				animate="visible"
				variants={textVariants}
			>
				<h2 className="text-2xl font-bold mb-4">Hành Động Nhanh</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors">
						Thêm Đại Lý Mới
					</button>
					<button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
						Xuất Hàng
					</button>
					<button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors">
						Thu Tiền
					</button>
				</div>
			</motion.div>
		</div>
	);
};

export default HomePage;
