const connection = require("../configs/database");
const security = require("../configs/bcrypt");

module.exports = {
  register(value) {
    return new Promise(async (resolve, reject) => {
      value.password = await security.password_hash(value.password);
      await connection.query(
        `INSERT INTO userlogin SET ?`,
        value,
        (error, result) => {
          console.log(value);
          if (error) return;
          resolve(result);
        }
      );
    });
  },
  onLogin(value) {
    return new Promise((resolve, reject) => {
      connection.query(
        "select * from userlogin where username =?",
        [value.username],
        async (err, result) => {
          if (err) return reject(error);
          //   console.log(result.length)
          //   return resolve(result[0]);
          if (result.length > 0) {
            const userLogin = result[0];
            const a = await security.password_valify(
              value.password,
              userLogin.password
            );
            if (a) {
              delete userLogin.password;
              return resolve(userLogin);
            }
          }
          reject(new Error("Invalid username or password "));
        }
      );
    });
  },
};
