const router = require("express").Router();
const {loginMiddleWare,encodeJwt} = require("../configs/jwt")

router.post("/login", loginMiddleWare, (req, res) => {
  const payload = {
    sub: req.body.username,
    iat: new Date().getTime(),
    timeOut: new Date().getTime() + 1000 * 60 * 60 * 24,
  };
  res.send(encodeJwt(payload));
});

module.exports = router;
