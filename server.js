import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Helper functions
const readDB = () => {
  return JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
};

const writeDB = (data) => {
  fs.writeFileSync('./db.json', JSON.stringify(data, null, 2), 'utf-8');
};

// Lấy danh sách đại lý
app.get('/agent/getAllAgents', (req, res) => {
  const db = readDB();
  res.json({
    code: 200,
    data: db.agents || [],
    message: 'Lấy danh sách đại lý thành công',
    status: 'success',
  });
});

// Thêm đại lý mới
app.post('/agent/addAgent', (req, res) => {
  const newAgent = req.body;
  const db = readDB();
  const agents = db.agents || [];

  newAgent.agentID = agents.length > 0 ? agents[agents.length - 1].agentID + 1 : 1;
  agents.push(newAgent);

  db.agents = agents;
  writeDB(db);

  res.status(201).json({
    code: 200,
    data: newAgent,
    message: 'Thêm đại lý thành công',
    status: 'success',
  });
});

app.put('/agent/updateDebt', (req, res) => {
  const agent = req.body;
  const db = readDB();
  const agents = db.agents || [];
  const index = agents.findIndex((a) => a.agentID === agent.agentID);
  if (index !== -1) {
    agents[index].debtMoney = parseInt(agent.debtMoney);
    db.agents = agents;
    writeDB(db);
    res.json({
      code: 200,
      data: agents[index],
      message: 'Cập nhật nợ thành công',
      status: 'success',
    });
  } else {
    res.status(404).json({
      code: 404,
      message: 'Đại lý không tồn tại',
      status: 'error',
    });
  }
});

app.delete('/agent/deleteAgent', (req, res) => {
  const agentID = parseInt(req.query.agentID);

  if (!agentID) {
    return res.status(400).json({
      code: 400,
      message: 'Thiếu agentID',
      status: 'fail',
    });
  }

  const db = readDB();
  const agents = db.agents || [];
  const index = agents.findIndex((a) => a.agentID === agentID);
  if (index !== -1) {
    agents.splice(index, 1);
    db.agents = agents;
    writeDB(db);
    res.json({
      code: 200,
      message: 'Xóa đại lý thành công',
      status: 'success',
    });
  } else {
    res.status(404).json({
      code: 404,
      message: 'Đại lý không tồn tại',
      status: 'error',
    });
  }
});

app.get('/payment/getAllPaymentReceipts', (req, res) => {
  const db = readDB();
  const paymentReceipts = db.paymentReceipts || [];

  res.json({
    code: 200,
    data: paymentReceipts,
    message: 'Lấy danh sách phiếu thu tiền thành công',
    status: 'success',
  });
});

// Import Receipt APIs
app.get('/importReceipt/getAllImportReceipts', (req, res) => {
	const db = readDB();
	res.json({
	  code: 200,
	  data: db.importReceipts || [],
	  message: 'Lấy danh sách phiếu nhập thành công',
	  status: 'SUCCESS'
	});
  });
  
  app.post('/importReceipt/addImportReceipt', (req, res) => {
	try {
	  const db = readDB();
	  const { dateReceipt, productID, unitID, quantityImport, importPrice } = req.body;
	  
	  if (!dateReceipt || !productID || !unitID || !quantityImport || !importPrice) {
		return res.status(400).json({
		  code: 400,
		  status: "BAD_REQUEST",
		  message: "Thiếu thông tin bắt buộc"
		});
	  }
  
	  const product = db.products.find(p => p.productID === productID);
	  const unit = db.units.find(u => u.unitID === unitID);
	  
	  if (!product || !unit) {
		return res.status(404).json({
		  code: 404,
		  status: "NOT_FOUND",
		  message: "Sản phẩm hoặc đơn vị không tồn tại"
		});
	  }
  
	  const newReceipt = {
		importReceiptID: db.importReceipts?.length > 0 
		  ? Math.max(...db.importReceipts.map(r => r.importReceiptID)) + 1 
		  : 1,
		dateReceipt,
		totalMoney: quantityImport * importPrice,
		details: [{
		  stt: 1,
		  productID,
		  productName: product.productName,
		  unitID,
		  unitName: unit.unitName,
		  quantityImport,
		  importPrice,
		  intoMoney: quantityImport * importPrice
		}]
	  };
  
	  db.importReceipts = [...(db.importReceipts || []), newReceipt];
	  writeDB(db);
  
	  res.status(201).json({
		code: 201,
		status: "CREATED",
		message: "Tạo phiếu nhập hàng thành công",
		data: newReceipt
	  });
	} catch (error) {
	  res.status(500).json({
		code: 500,
		status: "INTERNAL_SERVER_ERROR",
		message: error.message
	  });
	}
  });
  
  app.get('/importReceipt/getByDate', (req, res) => {
	try {
	  const { dateReceipt } = req.query;
	  const db = readDB();
	  
	  const filteredReceipts = db.importReceipts.filter(
		receipt => receipt.dateReceipt === dateReceipt
	  );
	  
	  res.json({
		code: 200,
		data: filteredReceipts,
		message: 'Lấy phiếu nhập theo ngày thành công',
		status: 'SUCCESS'
	  });
	} catch (error) {
	  res.status(500).json({
		code: 500,
		status: "INTERNAL_SERVER_ERROR",
		message: error.message
	  });
	}
  });
  
  // Import Detail APIs
  app.post('/importDetail/addImportDetail', (req, res) => {
	try {
	  const db = readDB();
	  const details = req.body;
	  
	  if (!Array.isArray(details)) {
		return res.status(400).json({
		  code: 400,
		  status: "BAD_REQUEST",
		  message: "Dữ liệu phải là mảng"
		});
	  }
  
	  const results = [];
	  
	  for (const detail of details) {
		const { importReceiptID, productID, unitID, quantityImport, importPrice } = detail;
		
		const receipt = db.importReceipts.find(r => r.importReceiptID === importReceiptID);
		const product = db.products.find(p => p.productID === productID);
		const unit = db.units.find(u => u.unitID === unitID);
		
		if (!receipt || !product || !unit) {
		  continue; // Hoặc có thể trả về lỗi
		}
  
		const newDetail = {
		  importReceiptID,
		  productID,
		  productName: product.productName,
		  unitID,
		  unitName: unit.unitName,
		  quantityImport,
		  importPrice,
		  intoMoney: quantityImport * importPrice
		};
  
		// Thêm vào phiếu nhập
		const receiptIndex = db.importReceipts.findIndex(r => r.importReceiptID === importReceiptID);
		if (receiptIndex !== -1) {
		  const stt = db.importReceipts[receiptIndex].details.length + 1;
		  db.importReceipts[receiptIndex].details.push({ ...newDetail, stt });
		  db.importReceipts[receiptIndex].totalMoney += newDetail.intoMoney;
		}
  
		results.push(newDetail);
	  }
  
	  writeDB(db);
  
	  res.status(201).json({
		code: 201,
		status: "CREATED",
		message: "Thêm chi tiết nhập hàng thành công",
		data: results
	  });
	} catch (error) {
	  res.status(500).json({
		code: 500,
		status: "INTERNAL_SERVER_ERROR",
		message: error.message
	  });
	}
  });
  
  app.get('/importDetail/getByReceipt', (req, res) => {
	try {
	  const { importReceiptID } = req.query;
	  const db = readDB();
	  
	  const receipt = db.importReceipts.find(r => r.importReceiptID === parseInt(importReceiptID));
	  
	  if (!receipt) {
		return res.status(404).json({
		  code: 404,
		  status: "NOT_FOUND",
		  message: "Không tìm thấy phiếu nhập"
		});
	  }
  
	  res.json({
		code: 200,
		data: receipt.details || [],
		message: 'Lấy chi tiết nhập hàng thành công',
		status: 'SUCCESS'
	  });
	} catch (error) {
	  res.status(500).json({
		code: 500,
		status: "INTERNAL_SERVER_ERROR",
		message: error.message
	  });
	}
  });
  
  // Product APIs
  app.get('/products', (req, res) => {
	const db = readDB();
	res.json({
	  code: 200,
	  data: db.products || [],
	  message: 'Lấy danh sách sản phẩm thành công',
	  status: 'SUCCESS'
	});
  });
  
  // Unit APIs
  app.get('/units', (req, res) => {
	const db = readDB();
	res.json({
	  code: 200,
	  data: db.units || [],
	  message: 'Lấy danh sách đơn vị thành công',
	  status: 'SUCCESS'
	});
  });
  
  // Error handling middleware
  app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
	  code: 500,
	  status: "INTERNAL_SERVER_ERROR",
	  message: "Đã xảy ra lỗi hệ thống"
	});
  });
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});