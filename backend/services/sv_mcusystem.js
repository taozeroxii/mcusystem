const connection = require("../configs/database");

module.exports = {
  mcu_now() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT mn.*,mi.mcu_addr FROM mcu_now mn LEFT JOIN mcu_id mi on mi.mcu_id = mn.mcu_id `, (error, result) => {
        if (error) return ;
        resolve(result);
      });
    });
  },
};
