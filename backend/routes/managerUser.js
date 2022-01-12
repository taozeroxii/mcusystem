const router = require("express").Router();
const jwt = require("jwt-simple");
const SECRET = "@Cpa10665#!";
//เสียบ middleware ยืนยันตัวตน JWT เข้าไป
// router.get("/", requireJWTAuth, (req, res) => {
//   res.send("ยอดเงินคงเหลือ 50");
// });
//ทำ Middleware สำหรับขอ JWT
const loginMiddleWare = (req, res, next) => {
  if (req.body.username === "kennaruk" && req.body.password === "mak") next();
  else res.send("Wrong username and password");
};

router.post("/login", loginMiddleWare, (req, res) => {
  const payload = {
    sub: req.body.username,
    iat: new Date().getTime(),
    timeOut: new Date().getTime() + 1000 * 60 * 60 * 24,
  };

  res.send(jwt.encode(payload, SECRET));
});

module.exports = router;
