const bcrypt = require("bcrypt");

const security = {
  async password_hash(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordhashed = await bcrypt.hash(password, salt);
    return passwordhashed;
  },
  async password_valify(password, password_hash) {
    const valifyPassword = await bcrypt.compare(password, password_hash);
    return valifyPassword;
  },
};

module.exports = security;
