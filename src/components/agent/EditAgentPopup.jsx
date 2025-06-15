import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FiEdit3, FiX, FiDollarSign, FiUser, FiSave } from 'react-icons/fi';

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
		<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
			<div className="bg-white rounded-2xl p-8 w-[500px] shadow-2xl transform transition-all duration-300 scale-100">
				{/* Header */}
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
						<div className="p-2 bg-blue-100 rounded-full">
							<FiEdit3 className="text-blue-600 text-xl" />
						</div>
						Sửa Tiền Nợ Đại Lý
					</h2>
					<button
						onClick={onClose}
						className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
					>
						<FiX className="text-gray-500 hover:text-gray-700 text-xl" />
					</button>
				</div>

				{/* Agent Info */}
				<div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
					<div className="flex items-center gap-2 mb-2">
						<FiUser className="text-gray-600" />
						<label className="text-sm font-medium text-gray-700">
							Tên đại lý:
						</label>
					</div>
					<p className="font-semibold text-gray-900 text-lg ml-6">
						{agent.agentName}
					</p>
				</div>

				{/* Debt Money Input */}
				<div className="mb-8">
					<label className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-700">
						<FiDollarSign className="text-gray-600" />
						Tiền nợ (VNĐ):
					</label>
					<div className="relative text-gray-900">
						<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
							<span className="text-gray-500 font-medium">₫</span>
						</div>
						<input
							type="number"
							value={debtMoney}
							onChange={(e) =>
								setDebtMoney(parseInt(e.target.value, 10) || 0)
							}
							className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 text-lg font-medium"
							placeholder="0"
						/>
					</div>
					<p className="mt-2 text-sm text-gray-500">
						Số tiền hiện tại:{' '}
						{agent.debtMoney?.toLocaleString('vi-VN')}₫
					</p>
				</div>

				{/* Buttons */}
				<div className="flex justify-end space-x-3">
					<button
						onClick={onClose}
						className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium border border-gray-300"
					>
						Hủy
					</button>
					<button
						onClick={handleUpdate}
						className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center gap-2"
					>
						<FiSave />
						Lưu
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditAgentPopup;
