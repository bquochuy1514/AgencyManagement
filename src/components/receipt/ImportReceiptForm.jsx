import React, { useState, useContext } from "react";
import { ProductContext } from "../../App";
import { addImportReceipt, addImportDetail } from "../../services/receiptService";
import { getAllProducts } from "../../services/productService";
import { getAllUnits } from "../../services/unitService";
import { toast } from "react-toastify";

const ImportReceiptForm = ({ onCancel, onSuccess }) => {
  const { products, units } = useContext(ProductContext);
  const [receiptData, setReceiptData] = useState({
    dateReceipt: new Date().toISOString().split("T")[0],
    details: [{ productID: "", unitID: "", quantityImport: 0, importPrice: 0 }],
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!receiptData.dateReceipt)
      newErrors.dateReceipt = "Ngày lập phiếu không được để trống";
    receiptData.details.forEach((detail, index) => {
      if (!detail.productID)
        newErrors[`productID_${index}`] = "Vui lòng chọn sản phẩm";
      if (!detail.unitID)
        newErrors[`unitID_${index}`] = "Vui lòng chọn đơn vị";
      if (!detail.quantityImport || detail.quantityImport <= 0)
        newErrors[`quantityImport_${index}`] = "Số lượng phải lớn hơn 0";
      if (!detail.importPrice || detail.importPrice <= 0)
        newErrors[`importPrice_${index}`] = "Giá nhập phải lớn hơn 0";
    });
    return newErrors;
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDetails = [...receiptData.details];
    updatedDetails[index] = { ...updatedDetails[index], [name]: value };
    setReceiptData({ ...receiptData, details: updatedDetails });
    setErrors({ ...errors, [`${name}_${index}`]: null });
  };

  const addDetail = () => {
    setReceiptData({
      ...receiptData,
      details: [
        ...receiptData.details,
        { productID: "", unitID: "", quantityImport: 0, importPrice: 0 },
      ],
    });
  };

  const removeDetail = (index) => {
    const updatedDetails = receiptData.details.filter((_, i) => i !== index);
    setReceiptData({ ...receiptData, details: updatedDetails });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      // Tạo phiếu nhập với chi tiết đầu tiên
      const firstDetail = receiptData.details[0];
      const receiptResponse = await addImportReceipt({
        dateReceipt: receiptData.dateReceipt,
        productID: parseInt(firstDetail.productID),
        unitID: parseInt(firstDetail.unitID),
        quantityImport: parseInt(firstDetail.quantityImport),
        importPrice: parseInt(firstDetail.importPrice),
      });

      const receiptId = receiptResponse.data.importReceiptID;

      // Chuẩn bị mảng chi tiết để gửi
      const detailsData = receiptData.details.map((detail) => ({
        importReceiptID: { importReceiptID: receiptId },
        productID: { productID: parseInt(detail.productID) },
        unitID: { unitID: parseInt(detail.unitID) },
        quantityImport: parseInt(detail.quantityImport),
        importPrice: parseInt(detail.importPrice),
      }));

      // Gửi mảng chi tiết
      const detailResponse = await addImportDetail(detailsData);
      if (detailResponse.status === "CREATED") {
        const totalPrice = detailResponse.data.reduce(
          (sum, item) => sum + item.intoMoney,
          0
        );
        onSuccess({
          importReceiptID: receiptId,
          dateReceipt: receiptData.dateReceipt,
          totalPrice,
          details: detailResponse.data.map((item, index) => ({
            stt: index + 1,
            productID: item.productID,
            productName: item.productName,
            unitID: item.unitID,
            unitName: item.unitName,
            quantityImport: item.quantityImport,
            importPrice: item.importPrice,
            intoMoney: item.intoMoney,
          })),
        });
        toast.success("Thêm phiếu nhập thành công!");
        setReceiptData({
          dateReceipt: new Date().toISOString().split("T")[0],
          details: [{ productID: "", unitID: "", quantityImport: 0, importPrice: 0 }],
        });
        setErrors({});
      }
    } catch (err) {
      console.error("Lỗi khi thêm phiếu nhập:", err);
      toast.error("Thêm phiếu nhập thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <div className="bg-[#2a3b4c] rounded-lg shadow-md p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">Thêm Phiếu Nhập Mới</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Ngày lập phiếu</label>
          <input
            type="date"
            name="dateReceipt"
            value={receiptData.dateReceipt}
            onChange={(e) =>
              setReceiptData({ ...receiptData, dateReceipt: e.target.value })
            }
            className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
          />
          {errors.dateReceipt && (
            <p className="text-red-400 text-sm mt-1">{errors.dateReceipt}</p>
          )}
        </div>
        <div>
          <h3 className="text-lg font-medium">Danh sách mặt hàng</h3>
          {receiptData.details.map((detail, index) => (
            <div key={index} className="border-t border-gray-600 pt-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium">Sản phẩm</label>
                  <select
                    name="productID"
                    value={detail.productID}
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 text-white"
                  >
                    <option value="">Chọn sản phẩm</option>
                    {products.map((product) => (
                      <option key={product.productID} value={product.productID}>
                        {product.productName}
                      </option>
                    ))}
                  </select>
                  {errors[`productID_${index}`] && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors[`productID_${index}`]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Đơn vị tính</label>
                  <select
                    name="unitID"
                    value={detail.unitID}
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 text-white"
                  >
                    <option value="">Chọn đơn vị</option>
                    {units.map((unit) => (
                      <option key={unit.unitID} value={unit.unitID}>
                        {unit.unitName}
                      </option>
                    ))}
                  </select>
                  {errors[`unitID_${index}`] && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors[`unitID_${index}`]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Số lượng</label>
                  <input
                    type="number"
                    name="quantityImport"
                    value={detail.quantityImport}
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 text-white"
                    placeholder="Số lượng"
                  />
                  {errors[`quantityImport_${index}`] && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors[`quantityImport_${index}`]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Giá nhập</label>
                  <input
                    type="number"
                    name="importPrice"
                    value={detail.importPrice}
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 text-white"
                    placeholder="Giá nhập"
                  />
                  {errors[`importPrice_${index}`] && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors[`importPrice_${index}`]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Thành tiền</label>
                  <input
                    type="number"
                    value={detail.quantityImport * detail.importPrice || 0}
                    readOnly
                    className="mt-1 block w-full bg-[#1a2634] border border-gray-600 rounded-md p-2 text-white bg-gray-700"
                  />
                </div>
              </div>
              {receiptData.details.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDetail(index)}
                  className="mt-2 text-red-400 hover:text-red-500"
                >
                  Xóa mặt hàng
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addDetail}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            + Thêm mặt hàng
          </button>
        </div>
        {errors.form && (
          <p className="text-red-400 text-sm mt-2">{errors.form}</p>
        )}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Thêm phiếu
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full bg-gray-600 px-4 py-2 rounded-md hover:bg-gray-700 transition text-white"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImportReceiptForm;