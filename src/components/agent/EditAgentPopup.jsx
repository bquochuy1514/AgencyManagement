// components/agent/EditAgentPopup.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const EditAgentPopup = ({ agent, onClose, onUpdated }) => {
	const [debtMoney, setDebtMoney] = useState(agent.debtMoney || 0);

	const handleUpdate = async () => {
		const response = await fetch(`http://localhost:3001/agent/updateDebt`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				debtMoney,
				agentID: agent.agentID,
			}),
		});
		const data = await response.json();

		if (data.code === 200) {
			toast.success('Cập nhật tiền nợ thành công!');
			onUpdated();
			onClose();
		} else {
			toast.error('Cập nhật tiền nợ thất bại!');
			console.error('Lỗi cập nhật:', data.message);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 w-[400px]">
				<h2 className="text-2xl font-bold mb-4 text-gray-800">
					Sửa Tiền Nợ Đại Lý
				</h2>
				<div className="mb-4">
					<label className="block mb-1 text-sm text-gray-700">
						Tên đại lý:
					</label>
					<p className="font-medium text-gray-900">
						{agent.agentName}
					</p>
				</div>
				<div className="mb-4 text-gray-700">
					<label className="block mb-1 text-sm text-gray-700">
						Tiền nợ (VNĐ):
					</label>
					<input
						type="number"
						value={debtMoney}
						onChange={(e) =>
							setDebtMoney(parseInt(e.target.value, 10) || 0)
						}
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				<div className="flex justify-end space-x-2">
					<button
						onClick={onClose}
						className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
					>
						Hủy
					</button>
					<button
						onClick={handleUpdate}
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
					>
						Lưu
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditAgentPopup;
