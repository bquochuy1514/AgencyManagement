import React from 'react';

const ViewReceiptPopup = ({ receipt, onClose }) => {
	if (!receipt) return null;

	const {
		agentID: { agentName, email, phone, address, paymentDate, revenue },
		paymentReceiptID,
	} = receipt;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
			<div className="bg-white text-gray-800 rounded-lg p-6 w-[90%] max-w-md shadow-lg">
				<h2 className="text-xl font-bold mb-4 text-yellow-600">
					Chi tiết phiếu thu #{paymentReceiptID}
				</h2>

				<div className="space-y-2">
					<p>
						<strong>Tên đại lý:</strong> {agentName}
					</p>
					<p>
						<strong>Email:</strong> {email}
					</p>
					<p>
						<strong>Số điện thoại:</strong> {phone}
					</p>
					<p>
						<strong>Địa chỉ:</strong> {address}
					</p>
					<p>
						<strong>Ngày thu:</strong>{' '}
						{new Date(paymentDate).toLocaleDateString('vi-VN')}
					</p>
					<p>
						<strong>Số tiền thu:</strong>{' '}
						{revenue.toLocaleString('vi-VN')}₫
					</p>
				</div>

				<button
					onClick={onClose}
					className="mt-6 w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-lg"
				>
					Đóng
				</button>
			</div>
		</div>
	);
};

export default ViewReceiptPopup;
