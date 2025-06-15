import React, { useState } from 'react';
import { toast } from 'react-toastify';

const DeleteAgentPopup = ({ agent, onClose, onDeleted }) => {
	const [loading, setLoading] = useState(false);

	const handleDelete = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				`http://localhost:3001/agent/deleteAgent?agentID=${agent.agentID}`,
				{
					method: 'DELETE',
				}
			);
			const data = await response.json();
			if (data.code === 200) {
				toast.success('Xóa đại lý thành công!');
				onDeleted();
				onClose();
			} else {
				toast.error('Xóa đại lý thất bại!');
			}
		} catch (error) {
			console.error('Lỗi khi xóa đại lý:', error);
			toast.error('Xóa đại lý thất bại!');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 w-[400px] text-gray-800">
				<h2 className="text-xl font-semibold mb-4 text-red-600">
					Xác Nhận Xóa
				</h2>
				<p className="mb-4">
					Bạn có chắc chắn muốn xóa đại lý{' '}
					<strong>{agent.agentName}</strong> không?
				</p>
				<div className="flex justify-end space-x-2">
					<button
						className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
						onClick={onClose}
						disabled={loading}
					>
						Hủy
					</button>
					<button
						className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
						onClick={handleDelete}
						disabled={loading}
					>
						Xóa
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteAgentPopup;
