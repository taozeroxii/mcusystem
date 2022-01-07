const connection = require("../configs/mycon");

module.exports = {
  mcu_now() {
    return new Promise((resolve, reject) => {
        connection.query(`select * from mcu_now`, (error, result) => {
        if (error) return ;
        resolve(result[0]);
      });
    });
  },
};
