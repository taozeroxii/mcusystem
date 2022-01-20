const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.TOKEN_KEY,
};
const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
  if (payload.exp > new Date().getTime()) done(null, true);
  else done(null, false);
});

passport.use(jwtAuth);

const requireJWTAuth = passport.authenticate("jwt", { session: false });

module.exports = requireJWTAuth;
