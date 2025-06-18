// // src/components/report/SalesReportForm.jsx
// import React, { useState } from "react";

// const SalesReportForm = ({ onSubmit }) => {
//   const [monthYear, setMonthYear] = useState(`${new Date().getMonth() + 1}/${new Date().getFullYear()}`);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const [month, year] = monthYear.split("/");
//     onSubmit({ month: parseInt(month), year: parseInt(year) });
//   };

//   const generateMonthYearOptions = () => {
//     const options = [];
//     for (let y = new Date().getFullYear() - 2; y <= new Date().getFullYear(); y++) {
//       for (let m = 1; m <= 12; m++) {
//         options.push(`${m}/${y}`);
//       }
//     }
//     return options;
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-800 rounded-lg">
//       <div className="grid grid-cols-1 gap-4">
//         <div>
//           <label className="block text-white">Tháng:</label>
//           <select
//             value={monthYear}
//             onChange={(e) => setMonthYear(e.target.value)}
//             className="w-full p-2 rounded bg-gray-700 text-white"
//           >
//             {generateMonthYearOptions().map((option) => (
//               <option key={option} value={option}>{option}</option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//         Lấy báo cáo
//       </button>
//     </form>
//   );
// };

// export default SalesReportForm;