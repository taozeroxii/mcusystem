const bcrypt = require('bcrypt');
const passport = require("passport");
const jwt = require("jwt-simple");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const SECRET = "@Cpa10665#!";
const connection = require("../configs/database");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: SECRET,
};

const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
  connection.query(`SELECT * from userlogin where username = '${payload.sub}'`, (error, result) => {
    if (error) return ;
    // console.log(result[0])
    if (payload.sub === result[0].username && payload.timeOut > new Date().getTime())
    done(null, true);
  else done(null, false);
  });
  
});

requireJWTAuth = passport.authenticate("jwt", { session: false });
passport.use(jwtAuth);

const security = {
  async password_hash(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordhashed = await bcrypt.hash(password,salt)
    return passwordhashed;
  },
  async password_valify(password, password_hash) {
   await bcrypt.compare(password, password_hash, function( result) {
      return result;
    });
   
  },

  requireJWTAuth() {
    return requireJWTAuth;
  },

  encodeJwt(payload) {
    return jwt.encode(payload, SECRET);
  },

  //ตรวจสอบการเข้าสู่ระบบ
  loginMiddleWare(req, res, next) {
    if (req.body.username === "kennaruk" && req.body.password === "mak") next();
    else res.send("Wrong username and password");
  },
};

module.exports = security;
