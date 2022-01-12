const router = require("express").Router();
const passport = require("passport");
requireJWTAuth = passport.authenticate("jwt", { session: false });

router.use("/mcusystem", requireJWTAuth, require("./mcusystem"));
router.use("/managerUser", require("./managerUser"));

module.exports = router;
