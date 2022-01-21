const router = require("express").Router();
const requireJWTAuth = require("../configs/jwt");

router.use("/managerUser", require("./managerUser"));
router.use("/mcusystem", requireJWTAuth, require("./mcusystem"));

module.exports = router;
