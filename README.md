## หน้าแสดงรายการอุณหภูมิความชื้น รพ ใช้งานด้วย node js + vue js 
     ดึงข้อมูลจากชุดคำสั่ง query ใน ฐานข้อมูล โดยมีการส่ง parameter พวกวันที่สิทธิเวลา และยิงชุด query ไปดึงข้อมูลเพื่อแสดงผลมาปั่นเอาค่าแสดงผลใน datable
# fontend
     หน้า src/views/form/tableshowdata จะมีส่วนการดุึงข้อมูลจาก backend 
     โดยใช้เป็น local ip 172.16.0.251 ไว้หากclone มาเปลียนเป็น http://localhost/:portที่กำหนด   ในส่วนนี้default port 3000
     npm install
     npm run serve
# backend
     1.ตั้งค่า Config Db ในไฟล์ .env
     2.npm i
     3.npm start 
