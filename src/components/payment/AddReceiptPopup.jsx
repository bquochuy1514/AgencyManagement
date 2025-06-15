import React, { useEffect, useState } from 'react';

const AddReceiptPopup = ({ onClose, onAdded }) => {
	const [agents, setAgents] = useState([]);
	const [selectedAgentID, setSelectedAgentID] = useState('');
	const [amount, setAmount] = useState('');
	const [createdBy, setCreatedBy] = useState('');

	useEffect(() => {
		fetch('http://localhost:3001/agent/getAllAgents')
			.then((res) => res.json())
			.then((data) => {
				if (data.code === 200) setAgents(data.data);
			});
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const agent = agents.find(
			(a) => a.agentID === parseInt(selectedAgentID)
		);

		const newReceipt = {
			agentID: agent.agentID,
			amount: parseInt(amount),
			createdBy: createdBy,
			paymentDate: new Date().toISOString().slice(0, 10),
		};

		try {
			const res = await fetch(
				'http://localhost:3001/payment/addReceipt',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(newReceipt),
				}
			);
			if (res.ok) {
				onAdded();
				onClose();
			}
		} catch (err) {
			console.error('Lỗi khi thêm phiếu thu:', err);
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

					<div>
						<label className="block text-sm font-medium">
							Người Ghi Nhận
						</label>
						<input
							type="text"
							className="w-full border p-2 rounded"
							value={createdBy}
							onChange={(e) => setCreatedBy(e.target.value)}
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
