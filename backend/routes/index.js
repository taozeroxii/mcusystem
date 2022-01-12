const router = require("express").Router();
const passport = require("passport");
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

const requireJWTAuth = passport.authenticate("jwt", { session: false });

router.use("/mcusystem", requireJWTAuth, require("./mcusystem"));
router.use("/managerUser", require("./managerUser"));

module.exports = router;
