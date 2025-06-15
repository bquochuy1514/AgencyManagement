import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FiAlertTriangle, FiX, FiTrash2 } from 'react-icons/fi';

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
		<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
			<div className="bg-white rounded-2xl p-8 w-[450px] text-gray-800 shadow-2xl transform transition-all duration-300 scale-100">
				{/* Header */}
				<div className="flex justify-between items-start mb-6">
					<div className="flex items-center gap-3">
						<div className="p-3 bg-red-100 rounded-full">
							<FiAlertTriangle className="text-red-600 text-2xl" />
						</div>
						<h2 className="text-2xl font-bold text-red-600">
							Xác Nhận Xóa
						</h2>
					</div>
					<button
						onClick={onClose}
						className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
						disabled={loading}
					>
						<FiX className="text-gray-500 hover:text-gray-700 text-xl" />
					</button>
				</div>

				{/* Content */}
				<div className="mb-8">
					<p className="text-gray-700 text-lg leading-relaxed">
						Bạn có chắc chắn muốn xóa đại lý{' '}
						<span className="font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">
							{agent.agentName}
						</span>{' '}
						không?
					</p>
					<div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
						<p className="text-red-700 text-sm">
							<strong>Lưu ý:</strong> Hành động này không thể hoàn
							tác!
						</p>
					</div>
				</div>

				{/* Buttons */}
				<div className="flex justify-end space-x-3">
					<button
						className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium border border-gray-300"
						onClick={onClose}
						disabled={loading}
					>
						Hủy
					</button>
					<button
						className={`px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center gap-2 ${
							loading ? 'opacity-75 cursor-not-allowed' : ''
						}`}
						onClick={handleDelete}
						disabled={loading}
					>
						{loading ? (
							<div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
						) : (
							<FiTrash2 />
						)}
						{loading ? 'Đang xóa...' : 'Xóa'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteAgentPopup;
