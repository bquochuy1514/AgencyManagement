import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddAgentPopup = ({ onClose, onAdded }) => {
	const [formData, setFormData] = useState({
		agentName: '',
		address: '',
		phone: '',
		email: '',
		agentTypeID: { agentTypeName: '' },
		districtID: { districtName: '' },
		debtMoney: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'agentTypeName') {
			setFormData({ ...formData, agentTypeID: { agentTypeName: value } });
		} else if (name === 'districtName') {
			setFormData({ ...formData, districtID: { districtName: value } });
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleSubmit = async () => {
		const response = await fetch('http://localhost:3001/agent/addAgent', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});

		const data = await response.json();

		if (data.code == 200) {
			toast.success('Thêm đại lý thành công!');
		}

		console.log('Dữ liệu từ API:', data);

		if (!response.ok) {
			throw new Error('Lỗi khi gửi dữ liệu');
		}

		onClose(); // đóng popup
		onAdded(); // gọi hàm để cập nhật danh sách đại lý
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white text-black p-6 rounded-lg w-96">
				<h2 className="text-xl font-bold mb-4">Thêm Đại Lý Mới</h2>
				<div className="space-y-3">
					<input
						name="agentName"
						placeholder="Tên đại lý"
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
					<input
						name="address"
						placeholder="Địa chỉ"
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
					<input
						name="phone"
						placeholder="Số điện thoại"
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
					<input
						name="email"
						placeholder="Email"
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
					<input
						name="agentTypeName"
						placeholder="Loại đại lý"
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
					<input
						name="districtName"
						placeholder="Tên quận"
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
					<input
						name="debtMoney"
						placeholder="Số tiền nợ"
						onChange={handleChange}
						className="w-full p-2 border rounded"
						type="number"
					/>
				</div>
				<div className="flex justify-end mt-4 space-x-2">
					<button
						onClick={onClose}
						className="bg-gray-500 text-white px-4 py-2 rounded"
					>
						Hủy
					</button>
					<button
						onClick={handleSubmit}
						className="bg-purple-600 text-white px-4 py-2 rounded"
					>
						Lưu
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddAgentPopup;
