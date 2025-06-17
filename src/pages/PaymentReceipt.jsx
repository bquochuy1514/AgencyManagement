import React, { useEffect, useState } from 'react';
import { FaEye, FaPlus, FaSearch } from 'react-icons/fa';
import AddReceiptPopup from '../components/payment/AddReceiptPopup';
import ViewReceiptPopup from '../components/payment/ViewReceiptPopup';

const PaymentReceipt = () => {
	const [receipts, setReceipts] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [showAddPopup, setShowAddPopup] = useState(false);
	const [selectedReceipt, setSelectedReceipt] = useState(null);

	const fetchReceipts = async () => {
		try {
			const res = await fetch(
				'http://localhost:3001/paymentReceipt/getAllPaymentReceipts'
			);
			const data = await res.json();
			if (data.code === 200) setReceipts(data.data);
		} catch (err) {
			console.error('Lỗi khi fetch phiếu thu:', err);
		}
	};

	useEffect(() => {
		fetchReceipts();
	}, []);

	const filteredReceipts = receipts.filter(
		(r) =>
			r.agentID.agentName
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			r.agentID.paymentDate.includes(searchTerm)
	);

	return (
		<div className="p-6 bg-gray-900 min-h-screen text-white">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-yellow-400">
					Phiếu Thu Tiền
				</h1>
				<p className="text-gray-400 mt-2">
					Tạo phiếu thu và xem lịch sử thu tiền từ các đại lý
				</p>
			</div>

			{/* Tìm kiếm & Thêm phiếu thu */}
			<div className="flex justify-between items-center mb-6">
				<div className="relative w-1/3">
					<input
						type="text"
						placeholder="Tìm theo tên đại lý hoặc ngày (YYYY-MM-DD)..."
						className="w-full p-2 pl-10 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
				</div>

				<button
					className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center"
					onClick={() => setShowAddPopup(true)}
				>
					<FaPlus className="mr-2" /> Tạo Phiếu Thu
				</button>
			</div>

			{showAddPopup && (
				<AddReceiptPopup
					onClose={() => setShowAddPopup(false)}
					onAdded={fetchReceipts}
				/>
			)}

			{selectedReceipt && (
				<ViewReceiptPopup
					receipt={selectedReceipt}
					onClose={() => setSelectedReceipt(null)}
				/>
			)}

			{/* Bảng danh sách phiếu thu */}
			<div className="bg-gray-800 p-4 rounded-lg shadow-lg">
				<table className="w-full text-left">
					<thead>
						<tr className="border-b border-gray-700">
							<th className="py-3 px-4">Tên Đại Lý</th>
							<th className="py-3 px-4">Email</th>
							<th className="py-3 px-4">SĐT</th>
							<th className="py-3 px-4">Địa Chỉ</th>
							<th className="py-3 px-4">Hành động</th>
						</tr>
					</thead>
					<tbody>
						{filteredReceipts.map((r) => (
							<tr
								key={r.paymentReceiptID}
								className="border-b border-gray-700 hover:bg-gray-700"
							>
								<td className="py-3 px-4">
									{r.agentID.agentName}
								</td>
								<td className="py-3 px-4">{r.agentID.email}</td>
								<td className="py-3 px-4">{r.agentID.phone}</td>
								<td className="py-3 px-4">
									{r.agentID.address}
								</td>
								<td className="py-3 px-4">
									<button
										onClick={() => setSelectedReceipt(r)}
										className="text-green-400 hover:text-green-300"
									>
										<FaEye />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PaymentReceipt;
