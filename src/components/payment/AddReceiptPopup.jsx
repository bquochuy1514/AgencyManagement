import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AddReceiptPopup = ({ onClose, onAdded }) => {
	const [agents, setAgents] = useState([]);
	const [selectedAgentID, setSelectedAgentID] = useState('');
	const [amount, setAmount] = useState('');
	const [paymentDate, setPaymentDate] = useState('');

	useEffect(() => {
		const fetchAgents = async () => {
			const response = await fetch(
				'http://localhost:3001/agent/getAllAgents'
			);
			const data = await response.json();
			if (data.code === 200) setAgents(data.data);
		};
		fetchAgents();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newReceipt = {
			agentID: {
				agentID: parseInt(selectedAgentID),
			},
			revenue: parseInt(amount),
			paymentDate,
		};

		try {
			const res = await fetch(
				'http://localhost:3001/paymentReceipt/addPaymentReceipt',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(newReceipt),
				}
			);
			if (res.ok) {
				// eslint-disable-next-line no-undef
				toast.success('Thêm phiếu thu tiền thành công');
				onAdded();
				onClose();
			}
		} catch (err) {
			console.error('Lỗi khi thêm phiếu thu:', err);
			toast.error('Có lỗi khi thêm phiếu thu tiền');
		}
	};

	const selectedAgent = agents.find(
		(a) => a.agentID === parseInt(selectedAgentID)
	);

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white rounded-lg p-6 w-[500px] text-black">
				<h2 className="text-xl font-bold mb-4">Tạo Phiếu Thu Mới</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium">
							Chọn Đại Lý
						</label>
						<select
							className="w-full border p-2 rounded"
							value={selectedAgentID}
							onChange={(e) => setSelectedAgentID(e.target.value)}
							required
						>
							<option value="">-- Chọn --</option>
							{agents.map((a) => (
								<option key={a.agentID} value={a.agentID}>
									{a.agentName}
								</option>
							))}
						</select>
					</div>

					{selectedAgent && (
						<div className="bg-gray-100 p-3 rounded">
							<p>
								<strong>Email:</strong> {selectedAgent.email}
							</p>
							<p>
								<strong>Địa chỉ:</strong>{' '}
								{selectedAgent.address}
							</p>
							<p>
								<strong>Điện thoại:</strong>{' '}
								{selectedAgent.phone}
							</p>
						</div>
					)}

					<div>
						<label className="block text-sm font-medium">
							Ngày Thu Tiền
						</label>
						<input
							type="date"
							className="w-full border p-2 rounded"
							value={paymentDate}
							onChange={(e) => setPaymentDate(e.target.value)}
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium">
							Số Tiền Thu
						</label>
						<input
							type="number"
							className="w-full border p-2 rounded"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							required
						/>
					</div>

					<div className="flex justify-end space-x-3 mt-4">
						<button
							type="button"
							className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
							onClick={onClose}
						>
							Hủy
						</button>
						<button
							type="submit"
							className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
						>
							Lưu Phiếu Thu
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddReceiptPopup;
