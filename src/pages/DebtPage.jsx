import React, { useEffect, useState } from 'react';
import { FaSearch, FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';

const DebtPage = () => {
	const [debts, setDebts] = useState([]);
	const [month, setMonth] = useState('');
	const [year, setYear] = useState('');
	const [selectedDebt, setSelectedDebt] = useState(null);
	const [showDetailPopup, setShowDetailPopup] = useState(false);
	const [agentID, setAgentID] = useState('');
	const [agents, setAgents] = useState([]);

	const fetchDebts = async () => {
		try {
			const res = await fetch(
				`http://localhost:3001/debtReport/getDebtReport?month=${month}&year=${year}`
			);
			const data = await res.json();
			if (data.code === 200) setDebts(data.data);
		} catch (err) {
			console.error('Lỗi khi fetch công nợ:', err);
		}
	};

	const fetchAgents = async () => {
		try {
			const res = await fetch('http://localhost:3001/agent/getAllAgents');
			const data = await res.json();
			if (data.code === 200) setAgents(data.data);
		} catch (err) {
			console.error('Lỗi khi fetch đại lý:', err);
		}
	};

	useEffect(() => {
		fetchAgents();
	}, []);

	useEffect(() => {
		if (month && year) fetchDebts();
	}, [month, year]);

	return (
		<div className="p-6 bg-gray-900 min-h-screen text-white">
			<h1 className="text-3xl font-bold text-yellow-400 mb-4">
				Công Nợ Đại Lý
			</h1>

			<div className="flex space-x-4 mb-6">
				<select
					value={month}
					onChange={(e) => setMonth(e.target.value)}
					className="bg-gray-800 text-white p-2 rounded"
				>
					<option value="">-- Tháng --</option>
					{[...Array(12)].map((_, i) => (
						<option key={i + 1} value={i + 1}>{`Tháng ${
							i + 1
						}`}</option>
					))}
				</select>

				<select
					value={year}
					onChange={(e) => setYear(e.target.value)}
					className="bg-gray-800 text-white p-2 rounded"
				>
					<option value="">-- Năm --</option>
					{[2023, 2024, 2025].map((y) => (
						<option key={y} value={y}>
							{y}
						</option>
					))}
				</select>
			</div>

			<div className="flex space-x-4 mb-6">
				<select
					value={agentID}
					onChange={(e) => setAgentID(e.target.value)}
					className="bg-gray-800 text-white p-2 rounded"
				>
					<option value="">-- Chọn Đại Lý --</option>
					{agents.map((agent) => (
						<option key={agent.agentID} value={agent.agentID}>
							{agent.agentName}
						</option>
					))}
				</select>

				<button
					onClick={async () => {
						if (!month || !year || !agentID) {
							alert('Vui lòng chọn đầy đủ tháng, năm và đại lý');
							return;
						}
						try {
							const res = await fetch(
								'http://localhost:3001/debtReport/addDebtReport',
								{
									method: 'POST',
									headers: {
										'Content-Type': 'application/json',
									},
									body: JSON.stringify({
										agentID: parseInt(agentID),
										month: parseInt(month),
										year: parseInt(year),
									}),
								}
							);
							const result = await res.json();
							if (result.code === 201) {
								toast.success(result.message);
								fetchDebts(); // cập nhật lại danh sách
							} else {
								toast.error(
									'Tạo không thành công: ' + result.message
								);
							}
						} catch (err) {
							console.error('Lỗi khi tạo báo cáo công nợ:', err);
							toast.error('Đã xảy ra lỗi');
						}
					}}
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
				>
					Tạo báo cáo công nợ
				</button>
			</div>

			<div className="bg-gray-800 p-4 rounded-lg shadow-lg">
				<table className="w-full text-left">
					<thead>
						<tr className="border-b border-gray-700">
							<th className="py-3 px-2">STT</th>
							<th className="py-3 px-4">Tên Đại Lý</th>
							<th className="py-3 px-4">Nợ Đầu</th>
							<th className="py-3 px-4">Phát Sinh</th>
							<th className="py-3 px-4">Nợ Cuối</th>
							<th className="py-3 px-4">Hành động</th>
						</tr>
					</thead>
					<tbody>
						{debts.map((d, i) => (
							<tr
								key={d.debtReportID}
								className="border-b border-gray-700 hover:bg-gray-700"
							>
								<td className="py-3 px-2">{i + 1}</td>
								<td className="py-3 px-4">{d.agentName}</td>
								<td className="py-3 px-4">
									{d.firstDebt.toLocaleString()}₫
								</td>
								<td className="py-3 px-4">
									{d.arisenDebt.toLocaleString()}₫
								</td>
								<td className="py-3 px-4">
									{d.lastDebt.toLocaleString()}₫
								</td>
								<td className="py-3 px-4">
									<button
										onClick={() => {
											setSelectedDebt(d);
											setShowDetailPopup(true);
										}}
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

			{showDetailPopup && selectedDebt && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white text-black p-6 rounded-lg w-[600px] max-h-[80vh] overflow-y-auto">
						<h2 className="text-xl font-bold mb-4">
							Lịch Sử Giao Dịch - {selectedDebt.agentName}
						</h2>
						<p>
							<strong>Nợ đầu kỳ:</strong>{' '}
							{selectedDebt.firstDebt.toLocaleString()}₫
						</p>
						<p>
							<strong>Phát sinh:</strong>{' '}
							{selectedDebt.arisenDebt.toLocaleString()}₫
						</p>
						<p>
							<strong>Nợ cuối kỳ:</strong>{' '}
							{selectedDebt.lastDebt.toLocaleString()}₫
						</p>

						<p className="mt-4 italic text-sm">
							(Chi tiết lịch sử xuất hàng & thu tiền sẽ hiển thị ở
							đây)
						</p>

						<div className="flex justify-end mt-4">
							<button
								onClick={() => setShowDetailPopup(false)}
								className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
							>
								Đóng
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DebtPage;
