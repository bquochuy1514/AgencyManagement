import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Lấy danh sách đại lý
app.get('/agent/getAllAgents', (req, res) => {
	const db = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
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
	const db = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
	const agents = db.agents || [];

	newAgent.agentID =
		agents.length > 0 ? agents[agents.length - 1].agentID + 1 : 1;
	agents.push(newAgent);

	fs.writeFileSync('./db.json', JSON.stringify({ agents }, null, 2), 'utf-8');

	res.status(201).json({
		code: 200,
		data: newAgent,
		message: 'Thêm đại lý thành công',
		status: 'success',
	});
});

app.put('/agent/updateDebt', (req, res) => {
	const agent = req.body;
	const db = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
	const agents = db.agents || [];
	const index = agents.findIndex((a) => a.agentID === agent.agentID);
	if (index !== -1) {
		agents[index].debtMoney = parseInt(agent.debtMoney);
		fs.writeFileSync(
			'./db.json',
			JSON.stringify({ agents }, null, 2),
			'utf-8'
		);
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

	const db = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
	const agents = db.agents || [];
	const index = agents.findIndex((a) => a.agentID === agentID);
	if (index !== -1) {
		agents.splice(index, 1);
		fs.writeFileSync(
			'./db.json',
			JSON.stringify({ agents }, null, 2),
			'utf-8'
		);
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

app.listen(PORT, () => {
	console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
