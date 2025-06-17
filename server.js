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

	newAgent.agentID =
		agents.length > 0 ? agents[agents.length - 1].agentID + 1 : 1;
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

app.get('/paymentReceipt/getAllPaymentReceipts', (req, res) => {
	const db = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
	const paymentReceipts = db.paymentReceipts || [];

	res.json({
		code: 200,
		data: paymentReceipts,
		message: 'Lấy danh sách phiếu thu tiền thành công',
		status: 'success',
	});
});

app.post('/paymentReceipt/addPaymentReceipt', (req, res) => {
	const db = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
	const paymentReceipts = db.paymentReceipts || [];
	const agents = db.agents || [];

	const { agentID, paymentDate, revenue } = req.body;

	if (!agentID?.agentID || !paymentDate || revenue == null) {
		return res.status(400).json({
			code: 400,
			status: 'fail',
			message: 'Thiếu thông tin phiếu thu',
		});
	}

	const foundAgent = agents.find((a) => a.agentID === agentID.agentID);

	if (!foundAgent) {
		return res.status(404).json({
			code: 404,
			status: 'fail',
			message: 'Không tìm thấy đại lý',
		});
	}

	const newReceipt = {
		paymentReceiptID:
			paymentReceipts.length > 0
				? paymentReceipts[paymentReceipts.length - 1].paymentReceiptID +
				  1
				: 1,
		agentID: {
			agentID: foundAgent.agentID,
			agentName: foundAgent.agentName,
			address: foundAgent.address,
			phone: foundAgent.phone,
			email: foundAgent.email,
			paymentDate: paymentDate,
			revenue: revenue,
		},
	};

	paymentReceipts.push(newReceipt);

	fs.writeFileSync(
		'./db.json',
		JSON.stringify({ ...db, paymentReceipts }, null, 2),
		'utf-8'
	);

	res.status(201).json({
		code: 201,
		status: 'success',
		message: 'Tạo phiếu thu tiền thành công',
		data: newReceipt,
	});
});

app.get('/debtReport/getDebtReport', (req, res) => {
	const { month, year } = req.query;

	if (!month || !year) {
		return res.status(400).json({
			code: 400,
			data: [],
			message: 'Thiếu tháng hoặc năm',
			status: 'error',
		});
	}

	fs.readFile('db.json', 'utf-8', (err, data) => {
		if (err) {
			console.error('Lỗi đọc db.json:', err);
			return res.status(500).json({
				code: 500,
				data: [],
				message: 'Lỗi server',
				status: 'error',
			});
		}

		const db = JSON.parse(data);
		const reports = db.debtReports || [];

		const filtered = reports.filter(
			(r) => r.month === parseInt(month) && r.year === parseInt(year)
		);

		return res.json({
			code: 200,
			data: filtered,
			message: 'Lấy báo cáo công nợ thành công',
			status: 'success',
		});
	});
});

app.post('/debtReport/addDebtReport', (req, res) => {
	const { agentID, month, year } = req.body;
	const dbPath = './db.json';
	const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

	if (!agentID || !month || !year) {
		return res.status(400).json({
			code: 400,
			status: 'error',
			message: 'Thiếu thông tin cần thiết',
		});
	}

	const agents = db.agents || [];
	const agent = agents.find((a) => a.agentID === agentID);
	if (!agent) {
		return res.status(404).json({
			code: 404,
			status: 'error',
			message: 'Không tìm thấy đại lý',
		});
	}

	// Tìm id mới: max current id + 1, nhưng vẫn là chuỗi
	const debtReports = db.debtReports || [];
	const maxID = debtReports.reduce((max, r) => {
		const id = parseInt(r.debtReportID, 10);
		return id > max ? id : max;
	}, 0);
	const nextID = (maxID + 1).toString();

	// Tạo báo cáo công nợ mới
	const newDebtReport = {
		debtReportID: nextID,
		month,
		year,
		agentID: agent.agentID,
		agentName: agent.agentName,
		firstDebt: 1000000,
		arisenDebt: 500000,
		lastDebt: 1500000,
	};

	// Thêm vào mảng và ghi lại file db.json
	db.debtReports.push(newDebtReport);
	fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');

	res.status(201).json({
		code: 201,
		status: 'success',
		message: 'Tạo báo cáo công nợ thành công',
		data: newDebtReport,
	});
});

app.listen(PORT, () => {
	console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
