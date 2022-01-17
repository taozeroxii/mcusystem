const router = require("express").Router();
const jwt = require("jwt-simple");
const services = require("../services/sv_manageuser");
const { check } = require("express-validator");

const loginMiddleWare = async (req, res, next) => {
  try {
    const model = await services.onLogin(req.body);
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
  // if (req.body.username === "kennaruk" && req.body.password === "mak") next();
  // else res.send("Wrong username and password");
};

router.post(
  "/register",
  [
    check("username", "กรุณากรอกข้อมูลusername").not().isEmpty(),
    check("password").not().isEmpty(),
  ],
  async (req, res) => {
    console.log(req);
    try {
      req.validate();
      const created = await services.register(req.body);
      res.json(created);
    } catch (ex) {
      res.error(ex);
    }
  }
);
// router.post("/register", (req, res) => {
//   const payload = {
//     sub: req.body.username,
//     iat: new Date().getTime(),
//     timeOut: new Date().getTime() + 1000 * 60 * 60 * 24,
//   };

//   res.send(jwt.encode(payload, process.env.TOKEN_KEY));
// });

router.post("/login", loginMiddleWare, (req, res) => {
  const payload = {
    sub: req.body.username,
    iat: new Date().getTime(),
    timeOut: new Date().getTime() + 1000 * 60 * 60 * 24,
  };

  res.send(jwt.encode(payload, process.env.TOKEN_KEY));
});

module.exports = router;
