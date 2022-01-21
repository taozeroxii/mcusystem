const router = require("express").Router();
const jwt = require("jwt-simple");
const services = require("../services/sv_manageuser");
const { check } = require("express-validator");

const loginMiddleWare = async (req, res, next) => {
  try {
    const model = await services.onLogin(req.body);

    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    const payload = {
      sub: model.username,
      level: model.level,
      pname: model.pname,
      fname: model.fname,
      lname: model.lname,
      iat: new Date().getTime(),
      exp: new Date().getTime() + 1000 * 60 * 10,
    };
    const token = jwt.encode(payload, process.env.TOKEN_KEY);
    // const detoken = jwt.decode(token, process.env.TOKEN_KEY);
    // console.log(detoken);

    res.json(token);
  } catch (ex) {
    res.error(ex);
  }
};

const CkRegisterMiddleWare = async (req, res, next) => {
  try {
    req.validate();
    const token = jwt.decode(req.body.token, process.env.TOKEN_KEY);

    if (new Date().getTime() > token.exp || token.level == 0) {
      res.error("Token หมดอายุ กรุณาล็อคอินใหม่อีกครั้ง");
      return;
    }
    delete req.body.token;
    const model = await services.register(req.body);
    if (!model) throw new Error("ไม่สำเร็จ");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
};

router.post(
  "/register",
  [
    check("username", "กรุณากรอก Username").not().isEmpty(),
    check("password").not().isEmpty(),
    check("pname").not().isEmpty(),
    check("fname").not().isEmpty(),
    check("lname").not().isEmpty(),
    check("token").not().isEmpty(),
  ],
  CkRegisterMiddleWare
);

router.post("/login", loginMiddleWare);

module.exports = router;
