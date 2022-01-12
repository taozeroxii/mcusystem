// const crypto = require('crypto');
const passport = require("passport");
const jwt = require("jwt-simple");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const SECRET = "@Cpa10665#!";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: SECRET,
};

const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
  if (payload.sub === "kennaruk" && payload.timeOut > new Date().getTime())
    done(null, true);
  else done(null, false);
});

passport.use(jwtAuth);

const security = {
  // password_hash(password) {
  //     return crypto.createHash('sha1').update(password).digest('hex');
  // },
  // password_valify(password, password_hash) {
  //     return security.password_hash(password) === password_hash;
  // },

  requireJWTAuth(){
      return requireJWTAuth = passport.authenticate("jwt", { session: false });
  },
  encodeJwt(payload){
    return jwt.encode(payload, SECRET)
  },

  //ตรวจสอบการเข้าสู่ระบบ
  loginMiddleWare(req, res, next) {
    if (req.body.username === "kennaruk" && req.body.password === "mak") next();
    else res.send("Wrong username and password");
  },
  // ตรวจสอบการเข้าถึงหน้า
  // isInRoles(roles = []){
  //     return function (req,res,next){
  //         //console.log(req.session.userLogin)
  //         try{
  //             if(roles.indexOf(req.session.userLogin.u_role) >= 0 )return next();
  //             throw new Error('Forbidden');
  //         }
  //         catch(ex){
  //             res.status(403).json({message : ex.message})
  //         }
  //     }
  // }
};

module.exports = security;
