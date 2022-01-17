const router = require("express").Router();
const requireJWTAuth = require("../configs/jwt");

router.use("/mcusystem", requireJWTAuth, require("./mcusystem"));
router.use("/managerUser", require("./managerUser"));

module.exports = router;
