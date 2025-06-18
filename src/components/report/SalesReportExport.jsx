// // src/components/report/SalesReportExport.jsx
// import React from 'react';
// import * as XLSX from 'xlsx';
// // import { jsPDF } from "jspdf";
// // import 'jspdf-autotable';

// const SalesReportExport = ({ data }) => {
// 	const exportToExcel = () => {
// 		const worksheetData = data.map((item, index) => ({
// 			STT: index + 1,
// 			'Đại Lý/Số Phiếu Xuất': `${item.agentName} (${item.quantityExportReceipt})`,
// 			'Tổng Trị Giá Lệ': `${item.totalValue.toLocaleString()} VNĐ (${item.proportion.toFixed(
// 				1
// 			)}%)`,
// 		}));
// 		const worksheet = XLSX.utils.json_to_sheet(worksheetData);
// 		const workbook = XLSX.utils.book_new();
// 		XLSX.utils.book_append_sheet(workbook, worksheet, 'SalesReport');
// 		XLSX.writeFile(workbook, 'SalesReport.xlsx');
// 	};

// 	const exportToPDF = () => {
// 		const doc = new jsPDF();
// 		doc.text('Báo Cáo Doanh Số', 10, 10);
// 		doc.autoTable({
// 			head: [['STT', 'Đại Lý/Số Phiếu Xuất', 'Tổng Trị Giá Lệ']],
// 			body: data.map((item, index) => [
// 				index + 1,
// 				`${item.agentName} (${item.quantityExportReceipt})`,
// 				`${item.totalValue.toLocaleString()} VNĐ (${item.proportion.toFixed(
// 					1
// 				)}%)`,
// 			]),
// 		});
// 		doc.save('SalesReport.pdf');
// 	};

// 	return (
// 		<div className="mt-4 flex space-x-4">
// 			<button
// 				onClick={exportToExcel}
// 				className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
// 			>
// 				Xuất Excel
// 			</button>
// 			<button
// 				onClick={exportToPDF}
// 				className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
// 			>
// 				Xuất PDF
// 			</button>
// 		</div>
// 	);
// };

// export default SalesReportExport;
