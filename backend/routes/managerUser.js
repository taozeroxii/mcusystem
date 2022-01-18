const router = require("express").Router();
const jwt = require("jwt-simple");
const services = require("../services/sv_manageuser");
const { check } = require("express-validator");

const loginMiddleWare = async (req, res, next) => {
  try {
    const model = await services.onLogin(req.body);
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    const payload = {
      sub: req.body.username,
      iat: new Date().getTime(),
      timeOut: new Date().getTime() + 1000 * 60 * 60 * 24,
    };
    model.token = jwt.encode(payload, process.env.TOKEN_KEY);
    // model.token = jwt.decode(model.token, process.env.TOKEN_KEY);
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
};

router.post(
  "/register",
  [
    check("username", "กรุณากรอก Username").not().isEmpty(),
    check("password", "กรุณากรอก Username").not().isEmpty(),
    check("pname", "กรุณากรอกคำนำหน้า").not().isEmpty(),
    check("fname", "กรุณากรอกชื่อจริง").not().isEmpty(),
    check("lname", "กรุณากรอกนามสกุล").not().isEmpty(),
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

router.post("/login", loginMiddleWare);

module.exports = router;
