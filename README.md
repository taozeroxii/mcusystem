## หน้าแสดงรายการอุณหภูมิความชื้น รพ ใช้งานด้วย node js + vue js 
     แสดงค่าอุณหภูมิไฟและความชื้น
# fontend
     หน้า src/views/form/tableshowdata จะมีส่วนการดุึงข้อมูลจาก backend 
     โดยใช้เป็น local ip 172.16.0.251 ไว้หาก clone มา
     เปลียนเป็น http://localhost/:portที่กำหนดในbackend 
     npm install
     npm run serve
# backend
     1.สร้างไฟล์ .env ใน directory backend  copy code ด้านล่างและ   ตั้งค่า Config Db เพื่อเชื่อมต่อฐานข้อมูล
          #connection MYSQL
          MYSQL_HOST=host
          MYSQL_USER=usernamedb
          MYSQL_PASSWORD=passworddb
          MYSQL_DB=dbname
          MYSQL_PORT=3306
          # API connection POSTGRE SQL
          PGSQL_HOST=host
          PGSQL_USER=usernamedb
          PGSQL_PASSWORD=passworddb
          PGSQL_DB=dbname
          PGSQL_PORT=5432

     2.npm i
     3.npm start 
