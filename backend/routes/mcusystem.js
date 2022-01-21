const router = require("express").Router();
const services = require("../services/sv_mcusystem");
const jwt = require("jwt-simple");

router.get("/", async (req, res) => {
  try {
    const model = await services.mcu_now();
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    // authorization
    const tokenlast = jwt.decode(
      req.headers.authorization,
      process.env.TOKEN_KEY
    );
    const payload = {
      sub: tokenlast.sub,
      level: tokenlast.level,
      iat: new Date().getTime(),
      exp: new Date().getTime() + 1000 * 60 * 10,
    };
    const token = jwt.encode(payload, process.env.TOKEN_KEY);
    res.json({ model, token });
  } catch (ex) {
    res.error(ex);
  }
});

router.post("/checkJWTexpire", async (req, res) => {
  try {
    const tokendata = jwt.decode(
      req.headers.authorization,
      process.env.TOKEN_KEY
    );
    var userloginData = {
      token: req.headers.authorization,
      username: tokendata.username,
      level: tokendata.level,
      fname: tokendata.fname,
      lname: tokendata.lname,
      pname: tokendata.niname,
    };
    res.status(200).json(userloginData);
  } catch (ex) {
    res.error(ex);
  }
});
module.exports = router;
