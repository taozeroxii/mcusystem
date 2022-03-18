const connection = require("../configs/database");

module.exports = {
  mcu_now() {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT mn.*,mi.mcu_addr FROM mcu_now mn LEFT JOIN mcu_id mi on mi.mcu_id = mn.mcu_id `,
        (error, result) => {
          if (error) return;
          resolve(result);
        }
      );
    });
  },
  mcu_year() {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT mcu_id,MIN(mcu_temp) as Low,MAX(mcu_temp) as High,MONTH(mcu_date) as months,YEAR(mcu_date) as years
FROM mcu_status 
WHERE mcu_date > DATE_SUB(now(), INTERVAL 1 YEAR)
GROUP BY months,mcu_id
ORDER BY years,months,mcu_id;`,
        (error, result) => {
          if (error) return;
          resolve(result);
        }
      );
    });
  },
};
