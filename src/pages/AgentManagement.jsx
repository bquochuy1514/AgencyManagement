import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const AgentManagement = () => {
	// Dữ liệu mẫu (có thể thay bằng API sau này)
	const [agents, setAgents] = useState([
		{
			id: 1,
			name: 'Đại Lý A',
			address: 'Hà Nội',
			phone: '0901234567',
			revenue: '1.2 Tỷ',
			status: 'Hoạt động',
		},
		{
			id: 2,
			name: 'Đại Lý B',
			address: 'TP.HCM',
			phone: '0912345678',
			revenue: '0.9 Tỷ',
			status: 'Hoạt động',
		},
		{
			id: 3,
			name: 'Đại Lý C',
			address: 'Đà Nẵng',
			phone: '0923456789',
			revenue: '0.5 Tỷ',
			status: 'Không hoạt động',
		},
	]);

	const [searchTerm, setSearchTerm] = useState('');

	// Lọc đại lý theo tìm kiếm
	const filteredAgents = agents.filter((agent) =>
		agent.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Animation variants
	const rowVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
	};

	const textVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
	};

	return (
		<div className="p-6 bg-gray-900 min-h-screen text-white">
			{/* Header Section */}
			<motion.div
				className="mb-8"
				initial="hidden"
				animate="visible"
				variants={textVariants}
			>
				<h1 className="text-3xl font-bold text-red-500">
					Quản Lý Đại Lý
				</h1>
				<p className="text-gray-400 mt-2">
					Quản lý danh sách đại lý và thông tin chi tiết
				</p>
			</motion.div>

			{/* Search and Add Button */}
			<div className="flex justify-between items-center mb-6">
				<div className="relative w-1/3">
					<input
						type="text"
						placeholder="Tìm kiếm đại lý..."
						className="w-full p-2 pl-10 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
				</div>
				<button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center">
					<FaPlus className="mr-2" /> Thêm Đại Lý Mới
				</button>
			</div>

			{/* Agent List Table */}
			<div className="bg-gray-800 p-4 rounded-lg shadow-lg">
				<table className="w-full text-left">
					<thead>
						<tr className="border-b border-gray-700">
							<th className="py-3 px-4">Tên Đại Lý</th>
							<th className="py-3 px-4">Địa Chỉ</th>
							<th className="py-3 px-4">Số Điện Thoại</th>
							<th className="py-3 px-4">Doanh Thu</th>
							<th className="py-3 px-4">Trạng Thái</th>
							<th className="py-3 px-4">Hành Động</th>
						</tr>
					</thead>
					<tbody>
						{filteredAgents.map((agent, index) => (
							<motion.tr
								key={agent.id}
								className="border-b border-gray-700 hover:bg-gray-700"
								variants={rowVariants}
								initial="hidden"
								animate="visible"
								transition={{ delay: index * 0.1 }}
							>
								<td className="py-3 px-4">{agent.name}</td>
								<td className="py-3 px-4">{agent.address}</td>
								<td className="py-3 px-4">{agent.phone}</td>
								<td className="py-3 px-4">{agent.revenue}</td>
								<td className="py-3 px-4">
									<span
										className={`px-2 py-1 rounded-full text-sm ${
											agent.status === 'Hoạt động'
												? 'bg-green-500'
												: 'bg-red-500'
										}`}
									>
										{agent.status}
									</span>
								</td>
								<td className="py-3 px-4 flex space-x-2">
									<button className="text-blue-500 hover:text-blue-400">
										<FaEdit />
									</button>
									<button className="text-red-500 hover:text-red-400">
										<FaTrash />
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AgentManagement;
