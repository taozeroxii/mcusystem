const router = require("express").Router();
const services = require("../services/sv_mcusystem");

router.get("/", async (req, res) => {
  try {
    const model = await services.mcu_now();
    if (!model) throw new Error("ไม่พบข้อมูลที่ค้นหา");
    res.json(model);
  } catch (ex) {
    res.error(ex);
  }
});

module.exports = router;
