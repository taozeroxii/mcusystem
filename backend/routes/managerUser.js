const router = require("express").Router();
const { check } = require("express-validator");
const {loginMiddleWare,encodeJwt} = require("../configs/jwt")
const services = require("../services/sv_manageuser");

// router.post("/login", loginMiddleWare, (req, res) => {
//   const payload = {
//     sub: req.body.username,
//     iat: new Date().getTime(),
//     timeOut: new Date().getTime() + 1000 * 60 * 60 * 24,
//   };
//   res.send(encodeJwt(payload));
// });

router.post('/register', [
  check('username', 'กรุณากรอกข้อมูลusername').not().isEmpty(),
  check('password').not().isEmpty(),
], async (req, res) => {
  try {
      req.validate();
      const created = await services.register(req.body);
      res.json(created);
  }
  catch (ex) {
      res.error(ex);
  }
});


router.post('/logins', [
  check('username').not().isEmpty(),
  check('password').not().isEmpty()
], async (req, res) => {
  try {
      req.validate();
      const userLogin = await services.onLogin(req.body);
      const payload = {
        sub: userLogin.username,
        iat: new Date().getTime(),
        timeOut: new Date().getTime() + 1000 * 60 * 60 * 24,
      };
      res.send(encodeJwt(payload));
      // res.json(userLogin)
  }
  catch (ex) {
      res.error(ex);
  }
});

module.exports = router;
