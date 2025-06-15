import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
	FiX,
	FiUser,
	FiMapPin,
	FiPhone,
	FiMail,
	FiTag,
	FiMap,
	FiDollarSign,
} from 'react-icons/fi';

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

		onClose();
		onAdded();
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 backdrop-blur-sm">
			<div className="bg-white text-gray-800 p-8 rounded-2xl w-[500px] shadow-2xl transform transition-all duration-300 scale-100 hover:scale-[1.02] max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
						<FiUser className="text-blue-600" />
						Thêm Đại Lý Mới
					</h2>
					<button
						onClick={onClose}
						className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
					>
						<FiX className="text-gray-500 hover:text-gray-700 text-xl" />
					</button>
				</div>

				{/* Form */}
				<div className="space-y-4">
					{/* Agent Name */}
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<FiUser className="text-gray-400" />
						</div>
						<input
							name="agentName"
							placeholder="Tên đại lý"
							onChange={handleChange}
							className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
						/>
					</div>

					{/* Address */}
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<FiMapPin className="text-gray-400" />
						</div>
						<input
							name="address"
							placeholder="Địa chỉ"
							onChange={handleChange}
							className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
						/>
					</div>

					{/* Phone */}
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<FiPhone className="text-gray-400" />
						</div>
						<input
							name="phone"
							placeholder="Số điện thoại"
							onChange={handleChange}
							className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
						/>
					</div>

					{/* Email */}
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<FiMail className="text-gray-400" />
						</div>
						<input
							name="email"
							placeholder="Email"
							onChange={handleChange}
							className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
						/>
					</div>

					{/* Agent Type */}
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<FiTag className="text-gray-400" />
						</div>
						<input
							name="agentTypeName"
							placeholder="Loại đại lý"
							onChange={handleChange}
							className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
						/>
					</div>

					{/* District */}
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<FiMap className="text-gray-400" />
						</div>
						<input
							name="districtName"
							placeholder="Tên quận"
							onChange={handleChange}
							className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
						/>
					</div>

					{/* Debt Money */}
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<FiDollarSign className="text-gray-400" />
						</div>
						<input
							name="debtMoney"
							placeholder="Số tiền nợ"
							onChange={handleChange}
							className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
							type="number"
						/>
					</div>
				</div>

				{/* Buttons */}
				<div className="flex justify-end mt-8 space-x-3">
					<button
						onClick={onClose}
						className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium border border-gray-300"
					>
						Hủy
					</button>
					<button
						onClick={handleSubmit}
						className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
					>
						Lưu
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddAgentPopup;
