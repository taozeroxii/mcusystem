const express = require("express");
var cors = require('cors')
const server = express(); //use express
server.use(cors())
require('dotenv').config();//config ค่าใน env ไฟล์

const bodyParser = require("body-parser"); // paser data json format
// const pgconnection = require("./configs/database"); //connect postgresql
require('node-datetime-thai');

// `ตั้งค่าการ parse ตัวแปรเมื่อ client request หรือส่งข้อมูลเข้ามา
server.use(bodyParser.urlencoded({ extended: false, limit: "500MB" }));
server.use(bodyParser.json({ limit: "500MB" }));
server.use(require('./configs/middleware'));//เรียกใช้ middleware สำหรับการตอบกลับ error 

const config = require("./configs"); //config port and jobschdue
const { PORT } = config; // เรียกใช้ port จากไฟล์config
const routes = require('./routes');

server.use('/api',routes);
server.get('*', (req, res) => {
    res.end(`backend server is started`);
})


server.listen(PORT, () => console.log(`sever running  port: ${PORT} . `));
